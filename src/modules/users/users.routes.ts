import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import {
  AppErrorSchema,
  PaginatedUserDataSchema,
  QuerySchema,
  UserDataSchema,
} from '../../lib';
import {
  CreateUserCommand,
  CreateUserSchema,
  DeleteUserCommand,
  DeleteUserParamSchema,
  UpdateUserCommand,
  UpdateUserParamSchema,
  UpdateUserSchema,
} from './commands';
import { GetUserParamSchema, GetUserQuery, GetUsersQuery } from './queries';

export const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { mediator } = fastify;

  fastify.post(
    '/',
    {
      schema: {
        description: 'Create a new user',
        tags: ['Users'],
        body: CreateUserSchema,
        response: {
          201: UserDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      const command = new CreateUserCommand(body);
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/',
    {
      schema: {
        description: 'Get all users with pagination',
        tags: ['Users'],
        querystring: QuerySchema,
        response: {
          200: PaginatedUserDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const query = new GetUsersQuery(request.query);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/:id',
    {
      schema: {
        description: 'Get a user by id',
        tags: ['Users'],
        params: GetUserParamSchema,
        response: {
          200: UserDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetUserQuery(params);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        description: 'Update an existing user partially',
        tags: ['Users'],
        params: UpdateUserParamSchema,
        body: UpdateUserSchema,
        response: {
          200: UserDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params, body } = request;
      const command = new UpdateUserCommand(params, body);
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        description: 'Delete a user',
        tags: ['Users'],
        params: DeleteUserParamSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params } = request;
      const command = new DeleteUserCommand(params);
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );
};
