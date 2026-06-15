import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateFeature } from '@lib/domain';
import { verifyMutateApi } from '../../util/index.js';

export const verifyCreateFeatureHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: CreateFeature
    }>, _: FastifyReply) => {
       await verifyMutateApi(convex, request);
    }
}