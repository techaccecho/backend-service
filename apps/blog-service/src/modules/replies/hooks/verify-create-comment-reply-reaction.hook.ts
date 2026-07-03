import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  verifyMutateCommentReplyReaction,
  verifyUserId,
} from '../../util/index.js';

export const verifyCreateCommentReplyReactionHook = (
  convex: ConvexHttpClient,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReplyReaction(convex, request);
    await verifyUserId(convex, request);
  };
};
