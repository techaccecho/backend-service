import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, QuerySchema, assertRequired, AsyncValidation } from '@lib/util';
import { Type } from '@sinclair/typebox';
import {
    PaginatedApiDataSchema, ApiDataSchema,
    GetApiParamsSchema, GetApiQuery, GetApisQuery,
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
    UpdateApiCommand,
    UpdateApiParamsSchema,
    UpdateApiSchema,
    UpdateFeatureCommand,
    UpdateFeatureParamsSchema,
    UpdateFeatureSchema,
    UpdateSubscriberCommand,
    UpdateSubscriberParamsSchema,
    UpdateSubscriberSchema
  } from '@lib/domain';
import {
  verifyCreateFeatureHook,
  verifyCreateSubscriberHook,
  verifyUpdateApiHook,
  verifyUpdateFeatureHook,
  verifyUpdateSubscriberHook,
  verifyDeleteApiHook,
  verifyDeleteFeatureHook,
  verifyDeleteSubscriberHook
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
      const command = new CreateApiCommand({create: body });
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
      const query = new GetApiQuery({params});
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
      const query = new GetApisQuery({query: request.query});
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

      const command = new UpdateApiCommand({params, update: body, existing: api });
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

      const command = new DeleteApiCommand({params, existing: api });
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
  
        const command = new CreateFeatureCommand({params, create: body, existing: api});
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
  
        const command = new UpdateFeatureCommand({params, update: body, existing: feature, api });
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
  
        const command = new DeleteFeatureCommand({params, existing: feature, api });
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
  
        const command = new CreateSubscriberCommand({params, create: body, existing: api });
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
        preHandler: [authenticate, verifyUpdateSubscriberHook(convex, validation)],
      },
      async (request, reply) => {
        const { params, body, api, subscriber } = request;
  
        assertRequired('api', api);
        assertRequired('subscriber', subscriber);
  
        const command = new UpdateSubscriberCommand({params, update: body, existing: subscriber, api });
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
  
        const command = new DeleteSubscriberCommand({params, existing: subscriber, api });
        await mediator.send(command);
        return reply.status(204).send(null);
      },
    );
};
