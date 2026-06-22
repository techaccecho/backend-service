import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateReaction } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateReactionHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateReaction
    }>, _: FastifyReply) => {
       await verifyUserId(convex, request);
       await verifyMutateBlog(convex, request, false);
    }
}