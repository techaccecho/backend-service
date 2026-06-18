import type { FastifyRequest } from 'fastify';
import { assertHasStringKey, ForbiddenError, ValidationError, assertRequired } from '@lib/util';
import { api } from '@lib/data';
import type { ConvexHttpClient } from 'convex/browser';

export const verifyAuthorId = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    const { auth } = request;
       
    assertRequired('auth', auth);

    const { body } = request;
    assertHasStringKey(body, 'authorId');
    
    const { authorId } = body;

    const userResponse = await convex.query(api.users.find, { id: authorId });

    if (userResponse == null) {
        throw new ValidationError({
            details: [
                {
                    path: '/authorId',
                    message: `authorId '${authorId}' is invalid`
                }
            ]
        })
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (userResponse.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.userRequest = userResponse;
}