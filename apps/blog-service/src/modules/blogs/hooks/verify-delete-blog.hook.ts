import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateBlog } from '../../util/index.js';

export const verifyDeleteBlogHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateBlog(convex, request);
  };
};
