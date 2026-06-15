import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { AsyncValidation } from '@lib/util';
import { UpdateBlog } from '@lib/domain';
import { verifyUpdateBlog } from '../../util/index.js'

export const verifyUpdateBlogHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateBlog
    }>, _: FastifyReply) => {
      await verifyUpdateBlog(convex, validation, request);
    }
}