import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateTag } from '@lib/domain';
import { verifyMutateTag } from '../../util/index.js'

export const verifyUpdateTagHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: UpdateTag
    }>, _: FastifyReply) => {
        await verifyMutateTag(convex, request);
        
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