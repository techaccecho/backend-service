import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateReaction } from '@lib/domain';
import { verifyMutateCommentReaction } from '../../util/index.js';

export const verifyUpdateCommentReactionHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateReaction
    }>, _: FastifyReply) => {
      await verifyMutateCommentReaction(convex, request);
      
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