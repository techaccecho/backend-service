import { api } from '@lib/data';
import { Tokens, toPaginatedData, toQuery } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type PaginatedBlogData, toBlog } from '../blog.schema.js';
import { GetBlogsByTypeQuery } from './get-blogs-by-type.query.js';

@injectable()
@requestHandler(GetBlogsByTypeQuery)
export class GetBlogsByTypeHandler
  implements RequestHandler<GetBlogsByTypeQuery, PaginatedBlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetBlogsByTypeQuery): Promise<PaginatedBlogData> {
    const { request } = query;
    const { type } = request;

    this.logger.info(`Getting ${type}s`);

    const result = await this.convex.query(api.blogs.listByType, {
      type: type,
      paginationOpts: toQuery(request.query),
      ...(request.query.sort ? { sort: request.query.sort } : {}),
      ...(request.query.search ? { search: request.query.search } : {}),
      ...(request.query.authorId ? { authorId: request.query.authorId } : {}),
      ...(request.user != null
        ? { userId: request.user.id, role: request.user.role }
        : {}),
    });

    return toPaginatedData({
      result,
      mapper: toBlog,
    });
  }
}
