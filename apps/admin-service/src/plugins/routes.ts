import fp from 'fastify-plugin';
import { apisRoutes } from '../modules/index.js';

export const routesPlugin = fp(async (fastify) => {
  const prefix = '/admin-api';
  await fastify.register(apisRoutes, { prefix });
});
