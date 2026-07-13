import fp from 'fastify-plugin';
import {
  blogsRoutes,
  commentsRoutes,
  repliesRoutes,
  rulesOfEngagementRoutes,
} from '../modules/index.js';

export const routesPlugin = fp(async (fastify) => {
  const prefix = '/blog-api';
  await fastify.register(blogsRoutes, { prefix });
  await fastify.register(commentsRoutes, { prefix });
  await fastify.register(repliesRoutes, { prefix });
  await fastify.register(rulesOfEngagementRoutes, { prefix });
});
