import { assertRequired, ForbiddenError } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateBlog } from '../../util/index.js';

export const verifySoftDeleteBlogHook = (convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateBlog(convex, request, false);

    const { auth } = request;
    assertRequired('auth', auth);

    if (auth.type !== 'user' || auth.user.role !== 'admin') {
      throw new ForbiddenError();
    }

    request.userRequest = auth.user;
  };
};
