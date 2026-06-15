import fp from 'fastify-plugin';
import { apisRoutes } from '../modules/index.js';

export const routesPlugin = fp(async (fastify) => {
  await fastify.register(apisRoutes, '/api/apis');
});
