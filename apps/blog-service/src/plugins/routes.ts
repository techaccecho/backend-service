import fp from 'fastify-plugin';
import { blogsRoutes, commentsRoutes, repliesRoutes } from '../modules/index.js';

export const routesPlugin = fp(async (fastify) => {
  await fastify.register(blogsRoutes, '/api/blogs');
  await fastify.register(commentsRoutes, '/api');
  await fastify.register(repliesRoutes, '/api');
});
