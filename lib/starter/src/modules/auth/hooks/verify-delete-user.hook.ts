import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateUser } from '../../../util/index.js';

export const verifyDeleteUserHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateUser(convex, request);
  };
};
