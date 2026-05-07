import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex/_generated/api';
import { type PaginatedPostData, toPaginatedData, toQuery } from '../../../lib';
import { TOKENS } from '../../../tokens';
import { toPost } from '../posts.schema';
import { GetPostsQuery } from './get-posts.query';

@injectable()
@requestHandler(GetPostsQuery)
export class GetPostsHandler
  implements RequestHandler<GetPostsQuery, PaginatedPostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetPostsQuery): Promise<PaginatedPostData> {
    this.logger.info('Getting posts');

    const posts = await this.convex.query(api.posts.list, {
      paginationOpts: toQuery(query.request),
    });

    return toPaginatedData({
      result: posts,
      mapper: toPost,
    });
  }
}
