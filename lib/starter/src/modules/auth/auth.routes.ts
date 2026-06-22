import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, assertRequired, AsyncValidation } from '@lib/util';
import {
    UserDataSchema,
    CreateUserCommand,
    CreateUserSchema,
    GetUserByAuthIdParamsSchema,
    GetUserByAuthIdQuery
  } from '@lib/domain';
import {
  verifyCreateUserHook,
} from './hooks/index.js';

export const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, mediator } = fastify;

  fastify.post(
    '/auth',
    {
      schema: {
        description: 'Register',
        tags: ['Auth'],
        body: CreateUserSchema,
        response: {
          201: UserDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate(), verifyCreateUserHook(validation)],
    },
    async (request, reply) => {
      const { body } = request;
      
      const command = new CreateUserCommand({create: body});
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/auth',
    {
      schema: {
        description: 'Get my details',
        tags: ['Auth'],
        response: {
          200: UserDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate(false)],
    },
    async (request, reply) => {
      const { user } = request;
      assertRequired('user', user);

      const query = new GetUserByAuthIdQuery({ params: {authId: user.sub }});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );
};
