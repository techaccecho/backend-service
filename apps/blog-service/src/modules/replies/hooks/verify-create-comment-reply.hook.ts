import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyAuthorId, verifyMutateComment } from '../../util/index.js';

export const verifyCreateCommentReplyHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateComment(convex, request);
    await verifyAuthorId(convex, request);
  };
};