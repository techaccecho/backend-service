import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyUserId, verifyMutateCommentReply } from '../../util/index.js';

export const verifyCreateCommentReplyViewerHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateCommentReply(convex, request, false);
        await verifyUserId(convex, request);
    }
}