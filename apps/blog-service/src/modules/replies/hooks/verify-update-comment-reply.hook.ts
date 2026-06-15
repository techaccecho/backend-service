import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateBlog } from '@lib/domain';
import { verifyMutateCommentReply } from '../../util/index.js';

export const verifyUpdateCommentReplyHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateBlog
    }>, _: FastifyReply) => {
      await verifyMutateCommentReply(convex, request);

      const update = request.body;

      const validationDetails = await validation
        .validator()
        .notEmpty({ value: update })
        .validate();

      if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
      }
    }
}