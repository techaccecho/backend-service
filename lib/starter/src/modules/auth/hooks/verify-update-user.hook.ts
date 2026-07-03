import type { UpdateBlog } from '@lib/domain';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateUser, verifyUpdateUser } from '../../../util/index.js';

export const verifyUpdateUserHook = (convex: ConvexHttpClient) => {
  return async (
    request: FastifyRequest<{
      Body: UpdateBlog;
    }>,
    _: FastifyReply,
  ) => {
    await verifyMutateUser(convex, request);
    await verifyUpdateUser(convex, request);
  };
};
