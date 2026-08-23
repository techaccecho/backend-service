export type StepType =
  | 'READ'
  | 'PUZZLE'
  | 'PASSCODE'
  | 'GAME_LEVEL'
  | 'EXTERNAL_LINK'
  | 'CUSTOM';
export type PrerequisiteMode = 'ALL' | 'ANY' | 'NONE';
export type StepStatus =
  | 'LOCKED'
  | 'UNLOCKED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'LOCKED_OUT';

export interface StepDefinition {
  id: string;
  order: number;
  type: StepType;
  title: string;
  isUnordered: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  prerequisites: string[];
  prerequisiteMode: PrerequisiteMode;
  lockoutPolicy?: {
    maxAttempts: number;
    resetPrerequisiteStepId: string;
  };
  unlockPayload?: Record<string, unknown>;
}

export interface StepProgress {
  status: StepStatus;
  attempts: number;
  completedAt?: string;
  customData?: Record<string, unknown>;
}

export interface ArgPlayerState {
  userId: string;
  username?: string;
  currentActiveStepId: string;
  completedStepIds: string[];
  stepStates: Record<string, StepProgress>;
  inventory: string[];
  customData?: Record<string, Record<string, unknown>>;
  metadata: Record<string, unknown>;
  lastUpdated: string;
}

export interface ProjectionPayload {
  userId: string;
  activeStep: {
    id: string;
    order: number;
    type: StepType;
    title: string;
    status: StepStatus;
    attempts: number;
    maxAttempts?: number;
    resetPrerequisiteStepId?: string;
  } | null;
  completedStepIds: string[];
  nextAvailableSteps: Array<{
    id: string;
    order: number;
    type: StepType;
    title: string;
    status: StepStatus;
    isUnordered: boolean;
  }>;
  unlockedPayloads: Record<string, unknown>;
}

/**
 * ArgRulesEngine
 * Sole central rules engine for state-service.
 * Evaluates ARG step prerequisites, player progress projection payloads,
 * passcode lockout policies, and automatic lockout clearing logic.
 */
export const ArgRulesEngine = {
  createInitialPlayerState(userId: string, username?: string): ArgPlayerState {
    return {
      userId,
      username: username || 'Player',
      currentActiveStepId: 'step_01_blog',
      completedStepIds: [],
      stepStates: {
        step_01_blog: { status: 'UNLOCKED', attempts: 0 },
      },
      inventory: [],
      metadata: { initializedAt: new Date().toISOString() },
      lastUpdated: new Date().toISOString(),
    };
  },

  evaluatePrerequisites(
    step: StepDefinition,
    completedSet: Set<string>,
    manifestMap: Map<string, StepDefinition>,
  ): boolean {
    if (
      step.prerequisiteMode === 'NONE' ||
      !step.prerequisites ||
      step.prerequisites.length === 0
    ) {
      return true;
    }

    if (step.prerequisiteMode === 'ANY') {
      return step.prerequisites.some((prereqId) => {
        const prereqStep = manifestMap.get(prereqId);
        return completedSet.has(prereqId) || Boolean(prereqStep?.isDeleted);
      });
    }

    return step.prerequisites.every((prereqId) => {
      const prereqStep = manifestMap.get(prereqId);
      return completedSet.has(prereqId) || Boolean(prereqStep?.isDeleted);
    });
  },

  computeProjectionPayload(
    playerState: ArgPlayerState,
    stepManifest: StepDefinition[],
  ): ProjectionPayload {
    const manifestMap = new Map<string, StepDefinition>();
    for (const s of stepManifest) {
      manifestMap.set(s.id, s);
    }

    const activeSteps = stepManifest
      .filter((s) => !s.isDeleted)
      .sort((a, b) => a.order - b.order);

    const completedSet = new Set(playerState.completedStepIds);
    const nextAvailableSteps: ProjectionPayload['nextAvailableSteps'] = [];
    const unlockedPayloads: Record<string, unknown> = {};

    for (const step of activeSteps) {
      const isCompleted = completedSet.has(step.id);
      const isPrereqsMet = this.evaluatePrerequisites(
        step,
        completedSet,
        manifestMap,
      );

      if (isCompleted) {
        if (step.unlockPayload) {
          unlockedPayloads[step.id] = step.unlockPayload;
        }
      } else if (isPrereqsMet) {
        const userStepState = playerState.stepStates[step.id];
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

    let activeStepInfo: ProjectionPayload['activeStep'] = null;
    const activeUserStep = nextAvailableSteps.find(
      (s) =>
        s.status === 'IN_PROGRESS' ||
        s.status === 'LOCKED_OUT' ||
        s.status === 'UNLOCKED',
    );

    if (activeUserStep) {
      const fullStepDef = manifestMap.get(activeUserStep.id);
      const userStepData = playerState.stepStates[activeUserStep.id];
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
      completedStepIds: playerState.completedStepIds,
      nextAvailableSteps,
      unlockedPayloads,
    };
  },

  completeStep(
    playerState: ArgPlayerState,
    stepId: string,
    stepManifest: StepDefinition[],
    customData?: Record<string, unknown>,
  ): { updatedState: ArgPlayerState; projectionPayload: ProjectionPayload } {
    if (!playerState.completedStepIds.includes(stepId)) {
      playerState.completedStepIds.push(stepId);
    }

    const currentAttempts = playerState.stepStates[stepId]?.attempts || 0;
    playerState.stepStates[stepId] = {
      status: 'COMPLETED',
      attempts: currentAttempts,
      completedAt: new Date().toISOString(),
      customData,
    };

    const manifestMap = new Map<string, StepDefinition>();
    for (const s of stepManifest) {
      manifestMap.set(s.id, s);
    }

    for (const [sId, sProgress] of Object.entries(playerState.stepStates)) {
      if (sProgress.status === 'LOCKED_OUT') {
        const stepDef = manifestMap.get(sId);
        if (stepDef?.lockoutPolicy?.resetPrerequisiteStepId === stepId) {
          playerState.stepStates[sId] = {
            status: 'UNLOCKED',
            attempts: 0,
          };
        }
      }
    }

    playerState.lastUpdated = new Date().toISOString();
    const projectionPayload = this.computeProjectionPayload(
      playerState,
      stepManifest,
    );

    return { updatedState: playerState, projectionPayload };
  },

  recordFailure(
    playerState: ArgPlayerState,
    stepId: string,
    stepManifest: StepDefinition[],
  ): { updatedState: ArgPlayerState; projectionPayload: ProjectionPayload } {
    const manifestMap = new Map<string, StepDefinition>();
    for (const s of stepManifest) {
      manifestMap.set(s.id, s);
    }

    const stepDef = manifestMap.get(stepId);
    const currentProgress = playerState.stepStates[stepId] || {
      status: 'UNLOCKED',
      attempts: 0,
    };

    const newAttempts = currentProgress.attempts + 1;
    const maxAttempts = stepDef?.lockoutPolicy?.maxAttempts || 6;
    const isLockedOut = newAttempts >= maxAttempts;

    playerState.stepStates[stepId] = {
      ...currentProgress,
      status: isLockedOut ? 'LOCKED_OUT' : 'IN_PROGRESS',
      attempts: newAttempts,
    };

    playerState.lastUpdated = new Date().toISOString();
    const projectionPayload = this.computeProjectionPayload(
      playerState,
      stepManifest,
    );

    return { updatedState: playerState, projectionPayload };
  },
};
