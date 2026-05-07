import type { Env } from '../lib';

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
}
