import { api } from '@lib/data';
import { toCreateUserArgs } from '@lib/domain';
import {
  type Config,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  type UserRole,
} from '@lib/util';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';

export const verifyApiKey = (config: Config) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    const apiKey = request.headers['x-api-key'];

    if (apiKey == null || apiKey !== config.API_KEY) {
      throw new UnauthorizedError();
    }

    request.auth = { type: 'api' };
  };
};

export const verifyJwt = (convex: ConvexHttpClient, verifyUser = true) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    console.log("use", request.user);
    try {
      if (request.headers.authorization == null) {
        throw new UnauthorizedError();
      }

      await request.jwtVerify();

      if (!verifyUser) {
        return;
      }

      const { user } = request;
      const authId = user.sub;

      const userResponse = await convex.query(api.users.findByAuthId, { authId });

      if (userResponse == null) {
          throw new NotFoundError({ resource: `user with authId ${authId}` });
      }

      request.auth = {
        type: 'user',
        user: userResponse,
      };
    } catch (_err) {
       console.log(_err);
      throw new UnauthorizedError();
    }
  };
};

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const { auth } = request;

    if (!auth) {
      request.log.warn('Auth context missing');
      throw new ForbiddenError();
    }

    // Apis and Admins bypass standard role restrictions
    if (auth.type === 'api') {
      return;
    }

    if (!(allowedRoles as string[]).includes(auth.user.role)) {
      request.log.warn(
        { userId: auth.user.id, userRole: auth.user.role, allowedRoles },
        'Unauthorized role access attempt',
      );
      throw new ForbiddenError();
    }
  };
};
