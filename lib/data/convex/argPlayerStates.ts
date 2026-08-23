import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';

// Helper function to evaluate prerequisites
function evaluatePrerequisites(
  step: any,
  completedSet: Set<string>,
  manifestMap: Map<string, any>,
): boolean {
  if (
    step.prerequisiteMode === 'NONE' ||
    !step.prerequisites ||
    step.prerequisites.length === 0
  ) {
    return true;
  }

  if (step.prerequisiteMode === 'ANY') {
    return step.prerequisites.some((prereqId: string) => {
      const prereqStep = manifestMap.get(prereqId);
      return completedSet.has(prereqId) || Boolean(prereqStep?.isDeleted);
    });
  }

  return step.prerequisites.every((prereqId: string) => {
    const prereqStep = manifestMap.get(prereqId);
    return completedSet.has(prereqId) || Boolean(prereqStep?.isDeleted);
  });
}

function computeProjection(playerState: any, stepManifest: any[]) {
  const manifestMap = new Map<string, any>();
  for (const s of stepManifest) {
    manifestMap.set(s.id, s);
  }

  const activeSteps = stepManifest
    .filter((s) => !s.isDeleted)
    .sort((a, b) => a.order - b.order);

  const completedSet = new Set<string>(playerState.completedStepIds || []);
  const nextAvailableSteps: any[] = [];
  const unlockedPayloads: Record<string, any> = {};

  for (const step of activeSteps) {
    const isCompleted = completedSet.has(step.id);
    const isPrereqsMet = evaluatePrerequisites(
      step,
      completedSet,
      manifestMap,
    );

    if (isCompleted) {
      if (step.unlockPayload) {
        unlockedPayloads[step.id] = step.unlockPayload;
      }
    } else if (isPrereqsMet) {
      const userStepState = playerState.stepStates?.[step.id];
      const status = userStepState?.status || 'UNLOCKED';
      nextAvailableSteps.push({
        id: step.id,
        order: step.order,
        type: step.type,
        title: step.title,
        status,
        isUnordered: step.isUnordered,
      });

      if (step.unlockPayload) {
        unlockedPayloads[step.id] = step.unlockPayload;
      }
    }
  }

  let activeStepInfo: any = null;
  const activeUserStep = nextAvailableSteps.find(
    (s) =>
      s.status === 'IN_PROGRESS' ||
      s.status === 'LOCKED_OUT' ||
      s.status === 'UNLOCKED',
  );

  if (activeUserStep) {
    const fullStepDef = manifestMap.get(activeUserStep.id);
    const userStepData = playerState.stepStates?.[activeUserStep.id];
    activeStepInfo = {
      id: activeUserStep.id,
      order: activeUserStep.order,
      type: activeUserStep.type,
      title: activeUserStep.title,
      status: userStepData?.status || activeUserStep.status,
      attempts: userStepData?.attempts || 0,
      maxAttempts: fullStepDef?.lockoutPolicy?.maxAttempts,
      resetPrerequisiteStepId:
        fullStepDef?.lockoutPolicy?.resetPrerequisiteStepId,
    };
  }

  return {
    userId: playerState.userId,
    activeStep: activeStepInfo,
    completedStepIds: playerState.completedStepIds || [],
    nextAvailableSteps,
    unlockedPayloads,
  };
}

export const getByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .unique();
  },
});

export const getProjectionPayload = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    let playerState = await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .unique();

    if (!playerState) {
      playerState = {
        _id: '' as any,
        _creationTime: Date.now(),
        userId: args.userId,
        completedStepIds: [],
        stepStates: {},
        inventory: [],
        lastUpdated: new Date().toISOString(),
      };
    }

    const steps = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_order')
      .collect();

    return computeProjection(playerState, steps);
  },
});

export const completeStep = mutation({
  args: {
    userId: v.string(),
    stepId: v.string(),
    customData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    let playerState = await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .unique();

    const now = new Date().toISOString();

    if (!playerState) {
      const docId = await ctx.db.insert('argPlayerStates', {
        userId: args.userId,
        completedStepIds: [args.stepId],
        stepStates: {
          [args.stepId]: {
            stepId: args.stepId,
            status: 'COMPLETED',
            attempts: 0,
            completedAt: now,
          },
        },
        inventory: [],
        customData: args.customData ? { [args.stepId]: args.customData } : {},
        lastUpdated: now,
      });
      playerState = await ctx.db.get(docId);
    } else {
      const completedSet = new Set(playerState.completedStepIds || []);
      completedSet.add(args.stepId);

      const stepStates = { ...(playerState.stepStates || {}) };
      stepStates[args.stepId] = {
        ...(stepStates[args.stepId] || {}),
        stepId: args.stepId,
        status: 'COMPLETED',
        completedAt: now,
      };

      // Reset any step that had a lockout policy pointing to this step
      const steps = await ctx.db.query('stepDefinitions').collect();
      for (const step of steps) {
        if (step.lockoutPolicy?.resetPrerequisiteStepId === args.stepId) {
          if (stepStates[step.id]) {
            stepStates[step.id] = {
              ...stepStates[step.id],
              status: 'UNLOCKED',
              attempts: 0,
            };
          }
        }
      }

      const customData = {
        ...(playerState.customData || {}),
        ...(args.customData ? { [args.stepId]: args.customData } : {}),
      };

      await ctx.db.patch(playerState._id, {
        completedStepIds: Array.from(completedSet),
        stepStates,
        customData,
        lastUpdated: now,
      });
      playerState = await ctx.db.get(playerState._id);
    }

    const allSteps = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_order')
      .collect();

    return computeProjection(playerState, allSteps);
  },
});

export const recordFailure = mutation({
  args: {
    userId: v.string(),
    stepId: v.string(),
  },
  handler: async (ctx, args) => {
    let playerState = await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .unique();

    const now = new Date().toISOString();
    const stepDef = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_public_id', (q) => q.eq('id', args.stepId))
      .unique();

    const maxAttempts = stepDef?.lockoutPolicy?.maxAttempts || 6;

    if (!playerState) {
      const docId = await ctx.db.insert('argPlayerStates', {
        userId: args.userId,
        completedStepIds: [],
        stepStates: {
          [args.stepId]: {
            stepId: args.stepId,
            status: maxAttempts <= 1 ? 'LOCKED_OUT' : 'IN_PROGRESS',
            attempts: 1,
            lastAttemptAt: now,
          },
        },
        inventory: [],
        lastUpdated: now,
      });
      playerState = await ctx.db.get(docId);
    } else {
      const stepStates = { ...(playerState.stepStates || {}) };
      const currentAttempts = (stepStates[args.stepId]?.attempts || 0) + 1;
      const isLockedOut = currentAttempts >= maxAttempts;

      stepStates[args.stepId] = {
        ...(stepStates[args.stepId] || {}),
        stepId: args.stepId,
        status: isLockedOut ? 'LOCKED_OUT' : 'IN_PROGRESS',
        attempts: currentAttempts,
        lastAttemptAt: now,
      };

      await ctx.db.patch(playerState._id, {
        stepStates,
        lastUpdated: now,
      });
      playerState = await ctx.db.get(playerState._id);
    }

    const allSteps = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_order')
      .collect();

    return computeProjection(playerState, allSteps);
  },
});

export const claimGuest = mutation({
  args: {
    userId: v.string(),
    guestUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const guestState = await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.guestUserId))
      .unique();

    let userState = await ctx.db
      .query('argPlayerStates')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .unique();

    const now = new Date().toISOString();

    if (guestState && guestState.completedStepIds.length > 0) {
      if (!userState) {
        const docId = await ctx.db.insert('argPlayerStates', {
          userId: args.userId,
          completedStepIds: guestState.completedStepIds,
          stepStates: guestState.stepStates || {},
          inventory: guestState.inventory || [],
          customData: guestState.customData || {},
          lastUpdated: now,
        });
        userState = await ctx.db.get(docId);
      } else {
        const userCompletedSet = new Set(userState.completedStepIds || []);
        for (const s of guestState.completedStepIds) {
          userCompletedSet.add(s);
        }
        const mergedStepStates = {
          ...(guestState.stepStates || {}),
          ...(userState.stepStates || {}),
        };
        const mergedCustomData = {
          ...(guestState.customData || {}),
          ...(userState.customData || {}),
        };

        await ctx.db.patch(userState._id, {
          completedStepIds: Array.from(userCompletedSet),
          stepStates: mergedStepStates,
          customData: mergedCustomData,
          lastUpdated: now,
        });
        userState = await ctx.db.get(userState._id);
      }
    }

    const allSteps = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_order')
      .collect();

    return computeProjection(userState || { userId: args.userId, completedStepIds: [] }, allSteps);
  },
});
