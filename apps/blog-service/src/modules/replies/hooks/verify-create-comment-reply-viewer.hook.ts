import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateCommentReply, verifyUserId } from '../../util/index.js';

export const verifyCreateCommentReplyViewerHook = (
  convex: ConvexHttpClient,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReply(convex, request, false);
    await verifyUserId(convex, request);
  };
};
