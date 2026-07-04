import type { CreateUser } from '@lib/domain';
import type { AsyncValidation } from '@lib/util';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyCreateUser } from '../../../util/index.js';

export const verifyCreateUserHook = (validation: AsyncValidation) => {
  return async (
    request: FastifyRequest<{
      Body: CreateUser;
    }>,
    _: FastifyReply,
  ) => {
    await verifyCreateUser(validation, request);
  };
};
