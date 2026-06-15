import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateUser } from '../../../util/index.js';

export const verifyMutateUserHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyMutateUser(convex, request);
    }
}