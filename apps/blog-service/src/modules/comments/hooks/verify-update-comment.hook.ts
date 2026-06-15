import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { AsyncValidation } from '@lib/util';
import { UpdateBlog } from '@lib/domain';
import { verifyUpdateComment } from '../../util/index.js'

export const verifyUpdateCommentHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateBlog
    }>, _: FastifyReply) => {
      await verifyUpdateComment(convex, validation, request);
    }
}