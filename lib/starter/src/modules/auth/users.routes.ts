import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, QuerySchema, assertRequired, AsyncValidation } from '@lib/util';
import { Type } from '@sinclair/typebox';
import {
    PaginatedUserDataSchema, UserDataSchema,
    GetUserParamsSchema, GetUserQuery, GetUsersQuery,
    CreateUserCommand,
    CreateUserSchema,
    DeleteUserCommand,
    DeleteUserParamsSchema,
    UpdateUserCommand,
    UpdateUserParamsSchema,
    UpdateUserSchema,
  } from '@lib/domain';
import {
  verifyCreateUserHook,
  verifyUpdateUserHook,
  verifyDeleteUserHook
} from './hooks/index.js';

export const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;

  fastify.post(
    '/users',
    {
      schema: {
        description: 'Create user',
        tags: ['Users'],
        body: CreateUserSchema,
        response: {
          201: UserDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateUserHook(validation)],
    },
    async (request, reply) => {
      const { body } = request;
      
      const command = new CreateUserCommand({create: body});
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/users/:userId',
    {
      schema: {
        description: 'Get a user',
        tags: ['Users'],
        params: GetUserParamsSchema,
        response: {
          200: UserDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetUserQuery({params});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/users',
    {
      schema: {
        description: 'Get users',
        tags: ['Users'],
        querystring: QuerySchema,
        response: {
          200: PaginatedUserDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const query = new GetUsersQuery({query: request.query});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/users/:userId',
    {
      schema: {
        description: 'Update a user',
        tags: ['Users'],
        params: UpdateUserParamsSchema,
        body: UpdateUserSchema,
        response: {
          200: UserDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyUpdateUserHook(convex)],
    },
    async (request, reply) => {
      const { params, body, userRequest } = request;

      assertRequired('userRequest', userRequest);
      const command = new UpdateUserCommand({params, update: body, existing: userRequest});
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/users/:userId',
    {
      schema: {
        description: 'Delete a user',
        tags: ['Users'],
        params: DeleteUserParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteUserHook(convex)],
    },
    async (request, reply) => {
      const { params, userRequest } = request;
      assertRequired('userRequest', userRequest);

      const command = new DeleteUserCommand({params, existing: userRequest });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );
};
