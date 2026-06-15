import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateCommentReactionHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateBlog(convex, request);
        await verifyUserId(convex, request);
    }
}