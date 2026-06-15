import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  AsyncValidation,
} from '@lib/util';
import { CreateUser } from '@lib/domain';
import { verifyCreateUser } from '../../../util/index.js';

export const verifyCreateUserHook = (validation: AsyncValidation) => {
    return async (request: FastifyRequest<{
        Body: CreateUser
    }>, _: FastifyReply) => {
        await verifyCreateUser(validation, request);
    }
}