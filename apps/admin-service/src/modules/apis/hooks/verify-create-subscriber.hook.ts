import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateSubscriber } from '@lib/domain';
import { verifyMutateApi } from '../../util/index.js';

export const verifyCreateSubscriberHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateSubscriber
    }>, _: FastifyReply) => {
        await verifyMutateApi(convex, request);
    }
}