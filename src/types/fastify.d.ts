import type { Env } from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
}
