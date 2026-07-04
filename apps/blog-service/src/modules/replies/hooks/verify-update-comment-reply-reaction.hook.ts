import type { UpdateCommentReplyReaction } from '@lib/domain';
import { type AsyncValidation, ValidationError } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateCommentReplyReaction } from '../../util/index.js';

export const verifyUpdateCommentReplyReactionHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReplyReaction(convex, request);
    const update = request.body as UpdateCommentReplyReaction;

    const validationDetails = await validation
      .validator()
      .notEmpty({ value: update })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};
