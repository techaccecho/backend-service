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
import { fetchAuth0User } from '../util/index.js';

export const verifyApiKey = (config: Config) => {
  return async (request: FastifyRequest, _: FastifyReply) => {
    const apiKey = request.headers['x-api-key'];

    if (apiKey == null || apiKey !== config.API_KEY) {
      throw new UnauthorizedError();
    }

    request.auth = { type: 'api' };
  };
};

export const verifyJwt = (config: Config, convex: ConvexHttpClient) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {

    try {
      if (request.headers.authorization == null) {
        throw new UnauthorizedError();
      }

      await request.jwtVerify();

      const { user } = request;
      const authId = user.sub;

      const userResponse = await convex.query(api.users.findByAuthId, { authId });

      if (userResponse != null) {
        request.auth = {
          type: 'user',
          user: userResponse,
        };

        request.userRequest = userResponse;

        return;
      };

      const { nickname, name, picture, email, } = await fetchAuth0User(authId, config);

      const create = {
        authId,
        email,
        alias: (nickname || name) ?? undefined,
        avatar: picture != null ? { url: picture, type: 'media/image' as const } : undefined,
      };
      
      const args = toCreateUserArgs({ create });

      await convex.mutation(api.users.create, args);

      const created = await convex.query(api.users.find, { id: args.id });

      if (created == null) {
        throw new NotFoundError({ resource: `user with authId ${authId}` });
      }

      request.auth = {
        type: 'user',
        user: created
      };
      request.userRequest = created;
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
