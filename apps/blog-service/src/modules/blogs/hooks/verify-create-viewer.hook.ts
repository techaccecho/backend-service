import type { CreateViewer } from '@lib/domain';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifyMutateBlog, verifyUserId } from '../../util/index.js';

export const verifyCreateViewerHook = (convex: ConvexHttpClient) => {
  return async (
    request: FastifyRequest<{
      Body: CreateViewer;
    }>,
    _: FastifyReply,
  ) => {
    await verifyUserId(convex, request);
    await verifyMutateBlog(convex, request, false);
  };
};
