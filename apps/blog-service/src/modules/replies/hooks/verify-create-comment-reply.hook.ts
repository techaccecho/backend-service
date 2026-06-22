import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyAuthorId, verifyMutateCommentReply } from '../../util/index.js';

export const verifyCreateCommentReplyHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReply(convex, request, false);
    await verifyAuthorId(convex, request);
  };
};