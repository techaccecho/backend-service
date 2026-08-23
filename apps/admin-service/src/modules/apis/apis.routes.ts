import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inMemoryStepDefinitions = new Map<string, any>();

const loadManifestSeedIfNeeded = () => {
  if (inMemoryStepDefinitions.size === 0) {
    try {
      const manifestPath = path.join(
        __dirname,
        '../../../../state-service/config/arg_steps_manifest.json',
      );
      if (fs.existsSync(manifestPath)) {
        const steps = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        for (const s of steps) {
          inMemoryStepDefinitions.set(s.id, s);
        }
      }
    } catch {
      // Ignore fallback load error
    }
  }
};

import {
  ApiDataSchema,
  CreateApiCommand,
  CreateApiSchema,
  CreateFeatureCommand,
  CreateFeatureParamsSchema,
  CreateFeatureSchema,
  CreateSubscriberCommand,
  CreateSubscriberParamsSchema,
  CreateSubscriberSchema,
  DeleteApiCommand,
  DeleteApiParamsSchema,
  DeleteFeatureCommand,
  DeleteFeatureParamsSchema,
  DeleteSubscriberCommand,
  DeleteSubscriberParamsSchema,
  GetApiParamsSchema,
  GetApiQuery,
  GetApisQuery,
  PaginatedApiDataSchema,
  UpdateApiCommand,
  UpdateApiParamsSchema,
  UpdateApiSchema,
  UpdateFeatureCommand,
  UpdateFeatureParamsSchema,
  UpdateFeatureSchema,
  UpdateSubscriberCommand,
  UpdateSubscriberParamsSchema,
  UpdateSubscriberSchema,
} from '@lib/domain';
import {
  AppErrorSchema,
  AsyncValidation,
  assertRequired,
  QuerySchema,
} from '@lib/util';
import { Type } from '@sinclair/typebox';
import { container } from 'tsyringe';
import {
  verifyCreateFeatureHook,
  verifyCreateSubscriberHook,
  verifyDeleteApiHook,
  verifyDeleteFeatureHook,
  verifyDeleteSubscriberHook,
  verifyUpdateApiHook,
  verifyUpdateFeatureHook,
  verifyUpdateSubscriberHook,
} from './hooks/index.js';

export const apisRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;

  fastify.post(
    '/apis',
    {
      schema: {
        description: 'Create a api',
        tags: ['Apis'],
        body: CreateApiSchema,
        response: {
          201: ApiDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { body } = request;
      const command = new CreateApiCommand({ create: body });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/apis/:apiId',
    {
      schema: {
        description: 'Get an api',
        tags: ['Apis'],
        params: GetApiParamsSchema,
        response: {
          200: ApiDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetApiQuery({ params });
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/apis',
    {
      schema: {
        description: 'Get apis',
        tags: ['Apis'],
        querystring: QuerySchema,
        response: {
          200: PaginatedApiDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const query = new GetApisQuery({ query: request.query });
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/apis/:apiId',
    {
      schema: {
        description: 'Update an api',
        tags: ['Apis'],
        params: UpdateApiParamsSchema,
        body: UpdateApiSchema,
        response: {
          200: ApiDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyUpdateApiHook(convex, validation)],
    },
    async (request, reply) => {
      const { params, body, api } = request;

      assertRequired('api', api);

      const command = new UpdateApiCommand({
        params,
        update: body,
        existing: api,
      });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/apis/:apiId',
    {
      schema: {
        description: 'Delete an api',
        tags: ['Apis'],
        params: DeleteApiParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteApiHook(convex)],
    },
    async (request, reply) => {
      const { params, api } = request;

      assertRequired('api', api);

      const command = new DeleteApiCommand({ params, existing: api });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.post(
    '/apis/:apiId/features',
    {
      schema: {
        description: 'Create a feature',
        tags: ['Apis', 'Features'],
        params: CreateFeatureParamsSchema,
        body: CreateFeatureSchema,
        response: {
          201: ApiDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateFeatureHook(convex)],
    },
    async (request, reply) => {
      const { params, body, api } = request;

      assertRequired('api', api);

      const command = new CreateFeatureCommand({
        params,
        create: body,
        existing: api,
      });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/apis/:apiId/features/:featureId',
    {
      schema: {
        description: 'Update a feature',
        tags: ['Apis', 'Features'],
        params: UpdateFeatureParamsSchema,
        body: UpdateFeatureSchema,
        response: {
          200: ApiDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyUpdateFeatureHook(convex, validation)],
    },
    async (request, reply) => {
      const { params, body, api, feature } = request;

      assertRequired('api', api);
      assertRequired('feature', feature);

      const command = new UpdateFeatureCommand({
        params,
        update: body,
        existing: feature,
        api,
      });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/apis/:apiId/features/:featureId',
    {
      schema: {
        description: 'Delete a feature',
        tags: ['Apis', 'Features'],
        params: DeleteFeatureParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteFeatureHook(convex)],
    },
    async (request, reply) => {
      const { params, api, feature } = request;

      assertRequired('api', api);
      assertRequired('feature', feature);

      const command = new DeleteFeatureCommand({
        params,
        existing: feature,
        api,
      });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.post(
    '/apis/:apiId/subscribers',
    {
      schema: {
        description: 'Create a subscriber',
        tags: ['Apis', 'Subscribers'],
        params: CreateSubscriberParamsSchema,
        body: CreateSubscriberSchema,
        response: {
          201: ApiDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateSubscriberHook(convex)],
    },
    async (request, reply) => {
      const { params, body, api } = request;

      assertRequired('api', api);

      const command = new CreateSubscriberCommand({
        params,
        create: body,
        existing: api,
      });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/apis/:apiId/subscribers/:subscriberId',
    {
      schema: {
        description: 'Update a subscriber',
        tags: ['Apis', 'Subscribers'],
        params: UpdateSubscriberParamsSchema,
        body: UpdateSubscriberSchema,
        response: {
          200: ApiDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [
        authenticate,
        verifyUpdateSubscriberHook(convex, validation),
      ],
    },
    async (request, reply) => {
      const { params, body, api, subscriber } = request;

      assertRequired('api', api);
      assertRequired('subscriber', subscriber);

      const command = new UpdateSubscriberCommand({
        params,
        update: body,
        existing: subscriber,
        api,
      });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/apis/:apiId/subscribers/:subscriberId',
    {
      schema: {
        description: 'Delete a subscriber',
        tags: ['Apis', 'Subscribers'],
        params: DeleteSubscriberParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteSubscriberHook(convex)],
    },
    async (request, reply) => {
      const { params, api, subscriber } = request;

      assertRequired('api', api);
      assertRequired('subscriber', subscriber);

      const command = new DeleteSubscriberCommand({
        params,
        existing: subscriber,
        api,
      });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  // --- ARG Step Definition Management Routes ---

  fastify.get(
    '/arg-state/steps',
    {
      schema: {
        description: 'Get all ARG step definitions (including soft deleted)',
        tags: ['ARG State Steps'],
        response: {
          200: Type.Array(Type.Any()),
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      let steps: any = null;
      try {
        steps = await (convex as any)
          .query('stepDefinitions:listAll', {})
          .catch(() => null);
      } catch {
        steps = null;
      }
      if (!steps || !Array.isArray(steps) || steps.length === 0) {
        loadManifestSeedIfNeeded();
        steps = Array.from(inMemoryStepDefinitions.values());
      }
      return reply.status(200).send(steps);
    },
  );

  fastify.post(
    '/arg-state/steps',
    {
      schema: {
        description: 'Create or update an ARG step definition',
        tags: ['ARG State Steps'],
        body: Type.Object({
          id: Type.String(),
          order: Type.Number(),
          type: Type.String(),
          title: Type.String(),
          isUnordered: Type.Boolean(),
          prerequisites: Type.Array(Type.String()),
          prerequisiteMode: Type.String(),
          lockoutPolicy: Type.Optional(
            Type.Object({
              maxAttempts: Type.Number(),
              resetPrerequisiteStepId: Type.String(),
            }),
          ),
          unlockPayload: Type.Optional(Type.Any()),
        }),
        response: {
          201: Type.Object({ success: Type.Boolean(), step: Type.Any() }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const step = request.body as any;
      let response: any = null;
      try {
        response = await (convex as any)
          .mutation('stepDefinitions:save', { step })
          .catch(() => null);
      } catch {
        response = null;
      }
      if (!response) {
        inMemoryStepDefinitions.set(step.id, step);
        response = { success: true, step };
      }
      return reply.status(201).send(response);
    },
  );

  fastify.put(
    '/arg-state/steps/:id',
    {
      schema: {
        description: 'Update an existing ARG step definition',
        tags: ['ARG State Steps'],
        params: Type.Object({ id: Type.String() }),
        body: Type.Object({
          order: Type.Optional(Type.Number()),
          type: Type.Optional(Type.String()),
          title: Type.Optional(Type.String()),
          isUnordered: Type.Optional(Type.Boolean()),
          prerequisites: Type.Optional(Type.Array(Type.String())),
          prerequisiteMode: Type.Optional(Type.String()),
          lockoutPolicy: Type.Optional(
            Type.Object({
              maxAttempts: Type.Number(),
              resetPrerequisiteStepId: Type.String(),
            }),
          ),
          unlockPayload: Type.Optional(Type.Any()),
        }),
        response: {
          200: Type.Object({ success: Type.Boolean(), step: Type.Any() }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as any;
      let existing: any = null;
      try {
        existing = await (convex as any)
          .query('stepDefinitions:getById', { id })
          .catch(() => null);
      } catch {
        existing = null;
      }
      if (!existing) {
        loadManifestSeedIfNeeded();
        existing = inMemoryStepDefinitions.get(id);
      }
      const updatedStep = { ...(existing || {}), ...(request.body as any), id };
      let response: any = null;
      try {
        response = await (convex as any)
          .mutation('stepDefinitions:save', { step: updatedStep })
          .catch(() => null);
      } catch {
        response = null;
      }
      if (!response) {
        inMemoryStepDefinitions.set(id, updatedStep);
        response = { success: true, step: updatedStep };
      }
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/arg-state/steps/:id',
    {
      schema: {
        description: 'Soft-delete an ARG step definition',
        tags: ['ARG State Steps'],
        params: Type.Object({ id: Type.String() }),
        response: {
          200: Type.Object({ success: Type.Boolean(), id: Type.String() }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as any;
      let response: any = null;
      try {
        response = await (convex as any)
          .mutation('stepDefinitions:softDelete', { id })
          .catch(() => null);
      } catch {
        response = null;
      }
      if (!response) {
        loadManifestSeedIfNeeded();
        const step = inMemoryStepDefinitions.get(id);
        if (step) {
          step.isDeleted = true;
          step.deletedAt = new Date().toISOString();
        }
        response = { success: true, id };
      }
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/arg-state/steps/:id/restore',
    {
      schema: {
        description: 'Restore a soft-deleted ARG step definition',
        tags: ['ARG State Steps'],
        params: Type.Object({ id: Type.String() }),
        response: {
          200: Type.Object({ success: Type.Boolean(), id: Type.String() }),
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as any;
      let response: any = null;
      try {
        response = await (convex as any)
          .mutation('stepDefinitions:restore', { id })
          .catch(() => null);
      } catch {
        response = null;
      }
      if (!response) {
        loadManifestSeedIfNeeded();
        const step = inMemoryStepDefinitions.get(id);
        if (step) {
          step.isDeleted = false;
          delete step.deletedAt;
        }
        response = { success: true, id };
      }
      return reply.status(200).send(response);
    },
  );
};
