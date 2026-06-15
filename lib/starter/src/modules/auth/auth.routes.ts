import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, AsyncValidation } from '@lib/util';
import {
    UserDataSchema,
    CreateUserCommand,
    CreateUserSchema,
  } from '@lib/domain';
import {
  verifyCreateUserHook,
} from './hooks/index.js';

export const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, mediator } = fastify;

  fastify.post(
    '/auth/register',
    {
      schema: {
        description: 'Register a user',
        tags: ['Auth'],
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
};
