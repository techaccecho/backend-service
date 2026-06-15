import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateCommentViewer } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateCommentViewerHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateCommentViewer
    }>, _: FastifyReply) => {
        await verifyMutateBlog(convex, request);
        await verifyUserId(convex, request);
    }
}