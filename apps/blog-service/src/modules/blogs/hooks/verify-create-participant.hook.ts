import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateParticipant } from '@lib/domain';
import { verifyUserId, verifyMutateBlog } from '../../util/index.js';

export const verifyCreateParticipantHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateParticipant
    }>, _: FastifyReply) => {
        await verifyUserId(convex, request);
        await verifyMutateBlog(convex, request);
    }
}