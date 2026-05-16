import { api } from '@backend-service/convex';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  type PaginatedPostData,
  TOKENS,
  toPaginatedData,
  toQuery,
} from '../../../lib';
import { toPost } from '../../posts/posts.schema';
import { GetThreadsQuery } from './get-threads.query';

@injectable()
@requestHandler(GetThreadsQuery)
export class GetThreadHandler
  implements RequestHandler<GetThreadsQuery, PaginatedPostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetThreadsQuery): Promise<PaginatedPostData> {
    this.logger.info('Getting threads');

    const posts = await this.convex.query(api.posts.listByType, {
      type: 'thread',
      paginationOpts: toQuery(query.request),
    });

    return toPaginatedData({
      result: posts,
      mapper: toPost,
    });
  }
}
