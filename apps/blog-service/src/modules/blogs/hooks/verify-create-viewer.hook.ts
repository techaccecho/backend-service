import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateViewer } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateViewerHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateViewer
    }>, _: FastifyReply) => {
       await verifyUserId(convex, request);
       await verifyMutateBlog(convex, request);
    }
}