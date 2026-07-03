import type { CreateFeature } from '@lib/domain';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateApi } from '../../util/index.js';

export const verifyCreateFeatureHook = (convex: ConvexHttpClient) => {
  return async (
    request: FastifyRequest<{
      Body: CreateFeature;
    }>,
    _: FastifyReply,
  ) => {
    await verifyMutateApi(convex, request);
  };
};
