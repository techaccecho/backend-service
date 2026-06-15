import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateCommentReply } from '../../util/index.js';

export const verifyDeleteCommentReplyHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateCommentReply(convex, request);
    }
}