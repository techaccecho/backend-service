import type { AsyncValidation } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyUpdateComment } from '../../util/index.js';

export const verifyUpdateCommentHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyUpdateComment(convex, validation, request);
  };
};
