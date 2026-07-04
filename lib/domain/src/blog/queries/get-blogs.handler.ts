import { api } from '@lib/data';
import { Tokens, toPaginatedData, toQuery } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type PaginatedBlogData, toBlog } from '../blog.schema.js';
import { GetBlogsQuery } from './get-blogs.query.js';

@injectable()
@requestHandler(GetBlogsQuery)
export class GetBlogsHandler
  implements RequestHandler<GetBlogsQuery, PaginatedBlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetBlogsQuery): Promise<PaginatedBlogData> {
    const { request } = query;
    this.logger.info('Getting blogs');

    const result = await this.convex.query(api.blogs.list, {
      paginationOpts: toQuery(request.query),
    });

    return toPaginatedData({
      result,
      mapper: toBlog,
    });
  }
}
