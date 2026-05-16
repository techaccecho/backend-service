import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  AppErrorSchema,
  PaginatedPostDataSchema,
  QuerySchema,
} from '../../lib';
import { GetThreadsQuery } from './queries';

export const threadsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { mediator } = fastify;

  fastify.get(
    '/',
    {
      schema: {
        description: 'Get all threads with pagination',
        tags: ['Threads'],
        querystring: QuerySchema,
        response: {
          200: PaginatedPostDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const query = new GetThreadsQuery(request.query);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );
};
