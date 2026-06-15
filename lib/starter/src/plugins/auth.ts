import fastifyAuth from '@fastify/auth';
import fastifyJwt, { type TokenOrHeader } from '@fastify/jwt';
import type { FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwksClient from 'jwks-rsa';
import { verifyApiKey, verifyJwt } from '../modules/index.js';

export const authPlugin = fp(async (fastify) => {
  const { config, convex } = fastify;

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

  fastify.decorate(
    'authenticate',
    fastify.auth([verifyApiKey(config), verifyJwt(convex)], {
      relation: 'or',
    }),
  );
});
