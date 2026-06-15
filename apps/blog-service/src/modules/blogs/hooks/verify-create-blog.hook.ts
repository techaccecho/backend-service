import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateBlog } from '@lib/domain';
import { verifyUserId } from '../../util/index.js';

export const verifyCreateBlogHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateBlog
    }>, _: FastifyReply) => {
        await verifyUserId(convex, request);
    }
}