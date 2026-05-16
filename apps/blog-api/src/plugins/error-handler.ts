import fp from 'fastify-plugin';
import { toAppError } from '../lib';

export const errorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const { id } = request;
    request.log.error({ err: error }, 'Request failed');
    const isProd = fastify.config.NODE_ENV === 'prod';
    const appError = toAppError({ error, isProd, requestId: id });

    switch (appError.code) {
      case 'VALIDATION_ERROR':
        reply.status(400).send(appError);
        break;
      case 'UNAUTHORIZED_ERROR':
        reply.status(401).send(appError);
        break;
      case 'NOT_FOUND_ERROR':
        reply.status(404).send(appError);
        break;
      default:
        reply.status(500).send(appError);
    }
  });
});
