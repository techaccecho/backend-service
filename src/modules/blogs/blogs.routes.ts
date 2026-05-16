import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  AppErrorSchema,
  PaginatedPostDataSchema,
  QuerySchema,
} from '../../lib';
import { GetBlogsQuery } from './queries';

export const blogsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { mediator } = fastify;

  fastify.get(
    '/',
    {
      schema: {
        description: 'Get all blogs with pagination',
        tags: ['Blogs'],
        querystring: QuerySchema,
        response: {
          200: PaginatedPostDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const query = new GetBlogsQuery(request.query);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );
};
