import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateCommentReplyReaction } from '@lib/domain';
import { verifyUserId, verifyMutateComment } from '../../util/index.js';

export const verifyCreateCommentReplyReactionHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateCommentReplyReaction
    }>, _: FastifyReply) => {
        await verifyMutateComment(convex, request);
        await verifyUserId(convex, request);
    }
}