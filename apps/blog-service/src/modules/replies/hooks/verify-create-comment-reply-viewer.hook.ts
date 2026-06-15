import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateCommentReplyViewer } from '@lib/domain';
import { verifyUserId, verifyMutateComment } from '../../util/index.js';

export const verifyCreateCommentReplyViewerHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateCommentReplyViewer
    }>, _: FastifyReply) => {
        await verifyMutateComment(convex, request);
        await verifyUserId(convex, request);
    }
}