import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateComment } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateCommentHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateComment
    }>, _: FastifyReply) => {
        await verifyMutateBlog(convex, request);
        await verifyUserId(convex, request);
    }
}