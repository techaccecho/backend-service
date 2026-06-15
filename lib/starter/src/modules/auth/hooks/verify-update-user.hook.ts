import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { UpdateBlog } from '@lib/domain';
import { verifyMutateUser, verifyUpdateUser } from '../../../util/index.js';

export const verifyUpdateUserHook = (convex: ConvexHttpClient) => {
    return async (request: FastifyRequest<{
        Body: UpdateBlog
    }>, _: FastifyReply) => {
      await verifyMutateUser(convex, request);
      await verifyUpdateUser(convex, request);
    }
}