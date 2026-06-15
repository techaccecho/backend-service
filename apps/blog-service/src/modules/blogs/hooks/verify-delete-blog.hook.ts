import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateBlog } from '../../util/index.js';

export const verifyDeleteBlogHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateBlog(convex, request);
    }
}