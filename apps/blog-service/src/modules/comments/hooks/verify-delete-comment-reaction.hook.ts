import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateCommentReaction } from '../../util/index.js';

export const verifyDeleteCommentReactionHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReaction(convex, request);
  };
};
