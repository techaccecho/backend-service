import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateComment } from '../../util/index.js';

export const verifyDeleteCommentHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateComment(convex, request);
  };
};
