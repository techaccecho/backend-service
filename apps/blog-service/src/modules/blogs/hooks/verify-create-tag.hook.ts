import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateTag } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateTagHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateTag
    }>, _: FastifyReply) => {
        await verifyUserId(convex, request);
        await verifyMutateBlog(convex, request);
    }
}