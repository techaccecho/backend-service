import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateSubscriber } from '@lib/domain';
import { verifyMutateApi } from '../../util/index.js';

export const verifyUpdateSubscriberHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateSubscriber
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