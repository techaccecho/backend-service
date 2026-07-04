import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateComment, verifyUserId } from '../../util/index.js';

export const verifyCreateCommentViewerHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateComment(convex, request, false);
    await verifyUserId(convex, request);
  };
};
