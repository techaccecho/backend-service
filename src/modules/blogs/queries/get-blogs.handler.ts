import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex';
import {
  type PaginatedPostData,
  TOKENS,
  toPaginatedData,
  toQuery,
} from '../../../lib';
import { toPost } from '../../posts/posts.schema';
import { GetBlogsQuery } from './get-blogs.query';

@injectable()
@requestHandler(GetBlogsQuery)
export class GetBlogsHandler
  implements RequestHandler<GetBlogsQuery, PaginatedPostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetBlogsQuery): Promise<PaginatedPostData> {
    this.logger.info('Getting blogs');

    const posts = await this.convex.query(api.posts.listByType, {
      type: 'blog',
      paginationOpts: toQuery(query.request),
    });

    return toPaginatedData({
      result: posts,
      mapper: toPost,
    });
  }
}
