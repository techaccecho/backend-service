import fastifyAuth from '@fastify/auth';
import fastifyJwt, { type TokenOrHeader } from '@fastify/jwt';
import type {
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
} from 'fastify';
import fp from 'fastify-plugin';
import jwksClient from 'jwks-rsa';
import {
  type Auth,
  CreateUserCommand,
  NotFoundError,
  UnauthorizedError,
} from '../lib';
import { GetUserByAuthIdQuery } from '../lib/queries';

export const authPlugin = fp(async (fastify) => {
  const { config, mediator } = fastify;

  const client = jwksClient({
    jwksUri: config.AUTH_JWKS_URI,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  });

  await fastify.register(fastifyJwt, {
    decode: {
      complete: true,
    },
    secret: async (_request: FastifyRequest, token: TokenOrHeader) => {
      if (!token || !('header' in token) || token.header?.kid == null) {
        throw new Error('Missing kid');
      }

      const key = await client.getSigningKey(token.header.kid);
      return key.getPublicKey();
    },

    verify: {
      allowedAud: config.AUTH_AUDIENCE,
      allowedIss: config.AUTH_ISSUER,
      algorithms: ['RS256'],
    },
  });

  await fastify.register(fastifyAuth);

  const verifyJwt = async (request: FastifyRequest, _reply: FastifyReply) => {
    try {
      if (request.headers.authorization == null) {
        throw new UnauthorizedError();
      }

      await request.jwtVerify();
      const { user } = request;
      const authId = user.sub;
      const email = user.email;

      try {
        const userByAuthIdQuery = new GetUserByAuthIdQuery({ authId });
        const response = await mediator.send(userByAuthIdQuery);
        request.auth = {
          type: 'user',
          user: {
            id: response.data.id,
            email: response.data.email,
          },
        };
      } catch (err) {
        if (err instanceof NotFoundError) {
          const createUserCommand = new CreateUserCommand({ authId, email });
          const response = await mediator.send(createUserCommand);
          request.auth = {
            type: 'user',
            user: {
              id: response.data.id,
              email: response.data.email,
            },
          };
        }
      }
    } catch (_err) {
      throw new UnauthorizedError();
    }
  };

  const verifyApiKey = async (request: FastifyRequest, _: FastifyReply) => {
    const apiKey = request.headers['x-api-key'];

    if (apiKey == null || apiKey !== config.API_KEY) {
      throw new UnauthorizedError();
    }

    request.auth = { type: 'api' };
  };

  fastify.decorate(
    'authenticate',
    fastify.auth([verifyApiKey, verifyJwt], { relation: 'or' }),
  );
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: preHandlerHookHandler;
  }
  interface FastifyRequest {
    auth?: Auth;
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
