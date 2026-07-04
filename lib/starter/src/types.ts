import type { Doc } from '@lib/data';
import type { Auth, Config } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { preHandlerHookHandler } from 'fastify';
import type { Mediator } from 'mediatr-ts';

declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
    mediator: Mediator;
    convex: ConvexHttpClient;
    authenticate: preHandlerHookHandler;
  }
  interface FastifyRequest {
    auth?: Auth;
    userRequest?: Doc<'users'>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      iss: string;
      sub: string;
      aud: string | string[];
      iat: number;
      exp: number;
      gty?: string;
      azp?: string;
      email: string;
    };
  }
}
