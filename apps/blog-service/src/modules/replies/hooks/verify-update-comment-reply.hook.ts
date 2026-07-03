import type { UpdateCommentReply } from '@lib/domain';
import { type AsyncValidation, ValidationError } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateCommentReply } from '../../util/index.js';

export const verifyUpdateCommentReplyHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    await verifyMutateCommentReply(convex, request, false);

    const update = request.body as UpdateCommentReply;

    const validationDetails = await validation
      .validator()
      .notEmpty({ value: update })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};
