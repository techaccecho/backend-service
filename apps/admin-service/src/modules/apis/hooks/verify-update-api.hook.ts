import type { UpdateApi } from '@lib/domain';
import type { AsyncValidation } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyUpdateApi } from '../../util/index.js';

export const verifyUpdateApiHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (
    request: FastifyRequest<{
      Body: UpdateApi;
    }>,
    _: FastifyReply,
  ) => {
    await verifyUpdateApi(convex, validation, request);
  };
};
