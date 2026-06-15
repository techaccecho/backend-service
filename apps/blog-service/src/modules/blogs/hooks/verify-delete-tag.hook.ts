import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateTag } from '../../util/index.js';

export const verifyDeleteTagHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateTag(convex, request);
    }
}