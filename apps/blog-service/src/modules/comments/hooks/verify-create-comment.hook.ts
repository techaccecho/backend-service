import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyAuthorId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateCommentHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateBlog(convex, request);
        await verifyAuthorId(convex, request);
    }
}