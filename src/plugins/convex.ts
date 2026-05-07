import { ConvexHttpClient } from 'convex/browser';
import fp from 'fastify-plugin';

export const convexPlugin = fp(async (fastify) => {
  const client = new ConvexHttpClient(fastify.config.CONVEX_URL);
  fastify.decorate('convex', client);
});

declare module 'fastify' {
  interface FastifyInstance {
    convex: ConvexHttpClient;
  }
}
