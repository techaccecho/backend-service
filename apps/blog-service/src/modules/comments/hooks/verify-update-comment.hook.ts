import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConvexHttpClient } from 'convex/browser';
import { AsyncValidation } from '@lib/util';
import { verifyUpdateComment } from '../../util/index.js'

export const verifyUpdateCommentHook = (convex: ConvexHttpClient, validation: AsyncValidation) => {
    return async (request: FastifyRequest, _: FastifyReply) => {
        await verifyUpdateComment(convex, validation, request);
    }
}