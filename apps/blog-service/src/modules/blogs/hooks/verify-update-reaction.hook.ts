import type { UpdateReaction } from '@lib/domain';
import { type AsyncValidation, ValidationError } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateReaction } from '../../util/index.js';

export const verifyUpdateReactionHook = (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
) => {
  return async (
    request: FastifyRequest<{
      Body: UpdateReaction;
    }>,
    _: FastifyReply,
  ) => {
    await verifyMutateReaction(convex, request);
    const update = request.body;

    const validationDetails = await validation
      .validator()
      .notEmpty({ value: update })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};
