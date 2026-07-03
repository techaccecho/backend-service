import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateReaction } from '../../util/index.js';

export const verifyDeleteReactionHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateReaction(convex, request);
  };
};
