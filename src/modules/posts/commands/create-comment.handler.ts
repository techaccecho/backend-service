import { randomUUID } from 'node:crypto';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api, type Id } from '../../../../convex';
import {
  NotFoundError,
  type PostData,
  TOKENS,
  toData,
  ValidationError,
} from '../../../lib';
import { toPost } from '../posts.schema';
import {
  CreateCommentCommand,
  toCreateCommentArgs,
} from './create-comment.command';

@injectable()
@requestHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements RequestHandler<CreateCommentCommand, PostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateCommentCommand): Promise<PostData> {
    const { param, request } = command;
    const { authorId, parentId } = request;
    const { id: postId } = param;

    this.logger.info({ postId }, `Creating comment for post: ${postId}`);

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

    const post = await this.convex.query(api.posts.find, {
      id: postId as Id<'posts'>,
    });

    if (post == null) {
      throw new ValidationError({
        details: [
          {
            path: '/postId',
            message: `postId ${postId} is invalid`,
          },
        ],
      });
    }

    const commentId = randomUUID();

    if (parentId != null) {
      const parent = post.comments.find((p) => p.id === parentId);

      if (parent == null) {
        throw new ValidationError({
          details: [
            {
              path: '/parentId',
              message: `parentId ${parentId} is invalid`,
            },
          ],
        });
      }

      const updated = await this.convex.mutation(
        api.posts.update,
        toCreateCommentArgs(request, commentId, post, author, parent),
      );

      if (updated == null) {
        throw new NotFoundError({ resource: `comment with id ${commentId}` });
      }

      return toData({ data: toPost(updated) });
    }

    const updated = await this.convex.mutation(
      api.posts.update,
      toCreateCommentArgs(request, commentId, post, author),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    return toData({ data: toPost(updated) });
  }
}
