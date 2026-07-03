import type { CreateParticipant } from '@lib/domain';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateBlog, verifyUserId } from '../../util/index.js';

export const verifyCreateParticipantHook = (convex: ConvexHttpClient) => {
  return async (
    request: FastifyRequest<{
      Body: CreateParticipant;
    }>,
    _: FastifyReply,
  ) => {
    await verifyUserId(convex, request);
    await verifyMutateBlog(convex, request, false);
  };
};
