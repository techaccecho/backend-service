import { Doc } from '@lib/data';
import type { Auth } from '@lib/util';
import type { preHandlerHookHandler } from 'fastify';
import { ConvexHttpClient } from 'convex/browser';
import { Mediator } from 'mediatr-ts';

import { type Config } from '@lib/util';

declare module 'fastify' {
  interface FastifyInstance {
     config: Config;
     mediator: Mediator;
     convex: ConvexHttpClient;
     authenticate: preHandlerHookHandler;
  }
  interface FastifyRequest {
    auth?: Auth;
    userRequest?: Doc<'users'>
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