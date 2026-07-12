import { api } from '@lib/data';
import {
  assertHasStringKey,
  assertRequired,
  ForbiddenError,
  ValidationError,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyRequest } from 'fastify';

export const verifyAuthorId = async (
  convex: ConvexHttpClient,
  request: FastifyRequest,
) => {
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
          message: `authorId '${authorId}' is invalid`,
        },
      ],
    });
  }

  request.userRequest = userResponse;

  if (auth.type === 'api' || auth.user.role === 'admin') {
    return;
  }

  if (userResponse.id !== auth.user.id) {
    throw new ForbiddenError();
  }
};
