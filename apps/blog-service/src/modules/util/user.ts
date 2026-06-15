import type { FastifyRequest } from 'fastify';
import { assertHasStringKey, ForbiddenError, ValidationError, assertRequired } from '@lib/util';
import { api } from '@lib/data';
import type { ConvexHttpClient } from 'convex/browser';

export const verifyUserId = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    const { auth } = request;
       
    assertRequired('auth', auth);

    const { body } = request;
    assertHasStringKey(body, 'userId');
    
    const { userId } = body;

    const userResponse = await convex.query(api.users.find, { id: userId });

    if (userResponse == null) {
        throw new ValidationError({
            details: [
                {
                    path: '/userId',
                    message: `userId '${userId}' is invalid`
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

    request.user = userResponse;
}