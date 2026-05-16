import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex';
import { NotFoundError, type PostData, TOKENS, toData } from '../../../lib';
import { toPost } from '../posts.schema';
import { GetPostQuery } from './get-post.query';

@injectable()
@requestHandler(GetPostQuery)
export class GetPostHandler implements RequestHandler<GetPostQuery, PostData> {
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetPostQuery): Promise<PostData> {
    const { id } = query.request;

    this.logger.info({ id }, `Getting post: ${id}`);

    const post = await this.convex.query(api.posts.find, {
      id,
    });

    if (post == null) {
      throw new NotFoundError({ resource: `post with id ${id}` });
    }

    return toData({ data: toPost(post) });
  }
}
