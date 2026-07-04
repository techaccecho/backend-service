import type { UpdateBlog } from '@lib/domain';
import type { AsyncValidation } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyUpdateBlog } from '../../util/index.js';

export const verifyUpdateBlogHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (
    request: FastifyRequest<{
      Body: UpdateBlog;
    }>,
    _: FastifyReply,
  ) => {
    await verifyUpdateBlog(convex, validation, request);
  };
};
