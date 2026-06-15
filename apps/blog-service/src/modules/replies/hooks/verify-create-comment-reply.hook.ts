import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateCommentReply } from '@lib/domain';
import { verifyUserId, verifyMutateComment } from '../../util/index.js';

export const verifyCreateCommentReplyHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateCommentReply
    }>, _: FastifyReply) => {
        await verifyMutateComment(convex, request);
        await verifyUserId(convex, request);
    }
}