import { ConvexHttpClient } from 'convex/browser';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  // Ensure CONVEX_URL is validated via @fastify/env
  const client = new ConvexHttpClient(fastify.config.CONVEX_URL);

  fastify.decorate('convex', client);
});

declare module 'fastify' {
  interface FastifyInstance {
    convex: ConvexHttpClient;
  }
}
