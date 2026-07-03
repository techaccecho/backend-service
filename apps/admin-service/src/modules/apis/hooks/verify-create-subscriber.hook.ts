import type { CreateSubscriber } from '@lib/domain';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateApi } from '../../util/index.js';

export const verifyCreateSubscriberHook = (convex: ConvexHttpClient) => {
  return async (
    request: FastifyRequest<{
      Body: CreateSubscriber;
    }>,
    _: FastifyReply,
  ) => {
    await verifyMutateApi(convex, request);
  };
};
