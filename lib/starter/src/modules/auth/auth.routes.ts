import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { toUser, UserDataSchema } from '@lib/domain';
import { AppErrorSchema, assertRequired, toData } from '@lib/util';

export const authRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { authenticate } = fastify;

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
      preHandler: [authenticate],
    },
    async (request, reply) => {
      const { userRequest } = request;
      assertRequired('userRequest', userRequest);
      return reply.status(200).send(toData({ data: toUser(userRequest) }));
    },
  );
};
