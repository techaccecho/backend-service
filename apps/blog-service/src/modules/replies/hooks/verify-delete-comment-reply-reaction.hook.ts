import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateCommentReply } from '../../util/index.js';

export const verifyDeleteCommentReplyReactionHook = (
  convex: ConvexHttpClient,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReply(convex, request);
  };
};
