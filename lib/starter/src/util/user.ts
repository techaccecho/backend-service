import type { FastifyRequest } from 'fastify';
import { AsyncValidation, assertRequired, assertHasStringKey, NotFoundError, ForbiddenError, ValidationError, ValidationDetail } from '@lib/util';
import { api } from '@lib/data';
import type { ConvexHttpClient } from 'convex/browser';
import { CreateUser } from '@lib/domain';

export const verifyCreateUser = async (validation: AsyncValidation, request: FastifyRequest<{ Body: CreateUser}>) => {
    const { authId, email, alias } = request.body;
    
    const validator = validation.validator();

    validator
    .uniqueAuthId({ value: authId })
    .uniqueEmail({ value: email });

    if (alias != null) {
        validator.uniqueAlias({ value: alias });
    }

    const validationDetails = await validator.validate();

    if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
    }
}

export const verifyUpdateUser = async (convex: ConvexHttpClient, request:  FastifyRequest) => {
    const { auth, userRequest } = request;

    assertRequired('auth', auth);
    assertHasStringKey(request.params, 'userId');
    assertRequired('userRequest', userRequest);

    const { userId } = request.params;
    const { authId, email, alias } = userRequest;

    const validationDetails: ValidationDetail[] = [];

    if (authId != null) {
        const response = await convex.query(api.users.findByAuthId, { authId });

        if (response != null && response.id !== userId) {
            validationDetails.push({path: '/authId', message: `authId '${authId} already exists`});
        }
    }

    if (email != null) {
        const response = await convex.query(api.users.findByEmail, { email });

        if (response != null && response.id !== userId) {
            validationDetails.push({path: '/email', message: `email '${email} already exists`});
        }
    }

    if (alias != null) {
        const response = await convex.query(api.users.findByAlias, { alias });

        if (response != null && response.id !== userId) {
            validationDetails.push({path: '/alias', message: `alias '${email} already exists`});
        }
    }

    if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
    }
}

export const verifyMutateUser = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    const { auth } = request;

    assertRequired('auth', auth);
    assertHasStringKey(request.params, 'userId');

    const { userId } = request.params;

    const userResponse = await convex.query(api.users.find, { id: userId });

    if (userResponse == null) {
        throw new NotFoundError({ resource: `user with id ${userId}` });
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (userResponse.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.userRequest = userResponse;
}