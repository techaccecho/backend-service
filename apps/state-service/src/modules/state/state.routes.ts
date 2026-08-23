import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { AppErrorSchema } from '@lib/util';
import { Type } from '@sinclair/typebox';
import {
  type ArgPlayerState,
  ArgRulesEngine,
  type StepDefinition,
} from './ArgRulesEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory store & manifest loader for state-service
const inMemoryPlayerStates = new Map<string, ArgPlayerState>();
let stepManifest: StepDefinition[] = [];

try {
  const manifestPath = path.join(
    __dirname,
    '../../../config/arg_steps_manifest.json',
  );
  if (fs.existsSync(manifestPath)) {
    stepManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }
} catch (error) {
  console.error(
    'Error loading ARG steps manifest seed data in state-service:',
    error,
  );
}

function getOrCreateState(userId: string, username?: string): ArgPlayerState {
  let state = inMemoryPlayerStates.get(userId);
  if (!state) {
    state = ArgRulesEngine.createInitialPlayerState(userId, username);
    inMemoryPlayerStates.set(userId, state);
  }
  return state;
}

export const stateRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { authenticate, convex } = fastify;

  fastify.get(
    '/player/state',
    {
      schema: {
        description: 'Get active player ARG progress projection payload',
        tags: ['ARG Player State'],
        response: {
          200: Type.Object({
            userId: Type.String(),
            activeStep: Type.Optional(Type.Any()),
            completedStepIds: Type.Array(Type.String()),
            nextAvailableSteps: Type.Array(Type.Any()),
            unlockedPayloads: Type.Record(Type.String(), Type.Any()),
          }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const reqAny = request as any;
      const userId = reqAny.user?.sub || reqAny.query?.userId || 'user-default';
      let payload: any;
      if (convex && (convex as any).query) {
        try {
          payload = await (convex as any).query(
            'argPlayerStates:getProjectionPayload',
            {
              userId,
            },
          );
        } catch {
          const state = getOrCreateState(userId);
          payload = ArgRulesEngine.computeProjectionPayload(
            state,
            stepManifest,
          );
        }
      } else {
        const state = getOrCreateState(userId);
        payload = ArgRulesEngine.computeProjectionPayload(state, stepManifest);
      }
      return reply.status(200).send(payload);
    },
  );

  fastify.post(
    '/player/step/complete',
    {
      schema: {
        description: 'Mark an ARG step completed for active player',
        tags: ['ARG Player State'],
        body: Type.Object({
          stepId: Type.String(),
          customData: Type.Optional(Type.Any()),
        }),
        response: {
          200: Type.Object({
            userId: Type.String(),
            activeStep: Type.Optional(Type.Any()),
            completedStepIds: Type.Array(Type.String()),
            nextAvailableSteps: Type.Array(Type.Any()),
            unlockedPayloads: Type.Record(Type.String(), Type.Any()),
          }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const reqAny = request as any;
      const userId = reqAny.user?.sub || reqAny.body?.userId || 'user-default';
      const { stepId, customData } = request.body;
      const typedCustomData = customData as Record<string, unknown> | undefined;
      let updatedPayload: any;
      if (convex && (convex as any).mutation) {
        try {
          updatedPayload = await (convex as any).mutation(
            'argPlayerStates:completeStep',
            { userId, stepId, customData },
          );
        } catch {
          const state = getOrCreateState(userId);
          const res = ArgRulesEngine.completeStep(
            state,
            stepId,
            stepManifest,
            typedCustomData,
          );
          inMemoryPlayerStates.set(userId, res.updatedState);
          updatedPayload = res.projectionPayload;
        }
      } else {
        const state = getOrCreateState(userId);
        const res = ArgRulesEngine.completeStep(
          state,
          stepId,
          stepManifest,
          typedCustomData,
        );
        inMemoryPlayerStates.set(userId, res.updatedState);
        updatedPayload = res.projectionPayload;
      }
      return reply.status(200).send(updatedPayload);
    },
  );

  fastify.post(
    '/player/step/fail',
    {
      schema: {
        description:
          'Record a failed attempt on an ARG step (triggers lockout on 6th attempt)',
        tags: ['ARG Player State'],
        body: Type.Object({
          stepId: Type.String(),
        }),
        response: {
          200: Type.Object({
            userId: Type.String(),
            activeStep: Type.Optional(Type.Any()),
            completedStepIds: Type.Array(Type.String()),
            nextAvailableSteps: Type.Array(Type.Any()),
            unlockedPayloads: Type.Record(Type.String(), Type.Any()),
          }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const reqAny = request as any;
      const userId = reqAny.user?.sub || reqAny.body?.userId || 'user-default';
      const { stepId } = request.body;
      let updatedPayload: any;
      if (convex && (convex as any).mutation) {
        try {
          updatedPayload = await (convex as any).mutation(
            'argPlayerStates:recordFailure',
            { userId, stepId },
          );
        } catch {
          const state = getOrCreateState(userId);
          const res = ArgRulesEngine.recordFailure(state, stepId, stepManifest);
          inMemoryPlayerStates.set(userId, res.updatedState);
          updatedPayload = res.projectionPayload;
        }
      } else {
        const state = getOrCreateState(userId);
        const res = ArgRulesEngine.recordFailure(state, stepId, stepManifest);
        inMemoryPlayerStates.set(userId, res.updatedState);
        updatedPayload = res.projectionPayload;
      }
      return reply.status(200).send(updatedPayload);
    },
  );

  fastify.post(
    '/player/claim-guest',
    {
      schema: {
        description:
          'Claim and merge guest player progress into authenticated user profile',
        tags: ['ARG Player State'],
        body: Type.Object({
          guestUserId: Type.String(),
          userId: Type.Optional(Type.String()),
        }),
        response: {
          200: Type.Object({
            userId: Type.String(),
            activeStep: Type.Optional(Type.Any()),
            completedStepIds: Type.Array(Type.String()),
            nextAvailableSteps: Type.Array(Type.Any()),
            unlockedPayloads: Type.Record(Type.String(), Type.Any()),
          }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const reqAny = request as any;
      const userId = reqAny.user?.sub || reqAny.body?.userId || 'user-default';
      const { guestUserId } = request.body;

      const guestState = inMemoryPlayerStates.get(guestUserId);
      let userState = getOrCreateState(userId);

      if (guestState && guestState.completedStepIds.length > 0) {
        for (const stepId of guestState.completedStepIds) {
          if (!userState.completedStepIds.includes(stepId)) {
            const res = ArgRulesEngine.completeStep(
              userState,
              stepId,
              stepManifest,
              guestState.customData?.[stepId],
            );
            userState = res.updatedState;
          }
        }
        inMemoryPlayerStates.set(userId, userState);
      }

      const payload = ArgRulesEngine.computeProjectionPayload(
        userState,
        stepManifest,
      );
      return reply.status(200).send(payload);
    },
  );
};
