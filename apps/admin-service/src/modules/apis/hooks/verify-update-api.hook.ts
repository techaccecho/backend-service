import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { AsyncValidation } from '@lib/util';
import { UpdateApi } from '@lib/domain';
import { verifyUpdateApi } from '../../util/index.js';

export const verifyUpdateApiHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateApi
    }>, _: FastifyReply) => {
      await verifyUpdateApi(convex, validation, request)
    }
}