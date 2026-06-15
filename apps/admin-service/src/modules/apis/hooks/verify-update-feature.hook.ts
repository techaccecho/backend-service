import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateFeature } from '@lib/domain';
import { verifyMutateApi } from '../../util/index.js';

export const verifyUpdateFeatureHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateFeature
    }>, _: FastifyReply) => {
      await verifyMutateApi(convex, request);

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