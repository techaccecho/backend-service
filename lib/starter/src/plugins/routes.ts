import fp from 'fastify-plugin';
import { authRoutes } from '../modules/index.js';

export type RoutesPluginOptions = {
  routePrefix: string;
};

export const routesPlugin = fp<RoutesPluginOptions>(
  async (fastify, { routePrefix }) => {
    await fastify.register(authRoutes, {
      prefix: `${routePrefix}/auth`,
    });
  },
);