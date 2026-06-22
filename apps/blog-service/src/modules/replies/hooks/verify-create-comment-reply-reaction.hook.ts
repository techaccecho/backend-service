import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyUserId, verifyMutateCommentReplyReaction } from '../../util/index.js';

export const verifyCreateCommentReplyReactionHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateCommentReplyReaction(convex, request);
        await verifyUserId(convex, request);
    }
}