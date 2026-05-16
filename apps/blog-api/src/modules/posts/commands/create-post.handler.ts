import { randomUUID } from 'node:crypto';
import { api, type Id } from '@backend-service/convex';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  NotFoundError,
  type PostData,
  TOKENS,
  toData,
  ValidationError,
} from '../../../lib';
import { toPost } from '../posts.schema';
import { CreatePostCommand, toCreatePostArgs } from './create-post.command';

@injectable()
@requestHandler(CreatePostCommand)
export class CreatePostHandler
  implements RequestHandler<CreatePostCommand, PostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreatePostCommand): Promise<PostData> {
    const { request } = command;
    const { authorId, title } = request;

    this.logger.info({ title: title }, `Creating post: ${title}`);

    const author = await this.convex.query(api.users.find, {
      id: authorId as Id<'users'>,
    });

    if (author == null) {
      throw new ValidationError({
        details: [
          {
            path: '/authorId',
            message: `authorId ${authorId} is invalid`,
          },
        ],
      });
    }

    const postId = randomUUID();

    await this.convex.mutation(
      api.posts.create,
      toCreatePostArgs(request, postId, author),
    );

    const post = await this.convex.query(api.posts.find, { id: postId });

    if (post == null) {
      throw new NotFoundError({ resource: `post with id ${postId}` });
    }

    return toData({ data: toPost(post) });
  }
}
