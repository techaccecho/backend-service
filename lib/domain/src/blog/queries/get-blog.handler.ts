import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../blog.schema.js';
import { GetBlogQuery } from './get-blog.query.js';

@injectable()
@requestHandler(GetBlogQuery)
export class GetBlogHandler implements RequestHandler<GetBlogQuery, BlogData> {
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetBlogQuery): Promise<BlogData> {
    const { request } = query;
    const { params } = request;
    const { blogId } = params;

    this.logger.info({ blogId }, `Getting blog: ${blogId}`);

    const response = await this.convex.query(api.blogs.find, {
      id: blogId,
    });

    if (response == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(response) });
  }
}
