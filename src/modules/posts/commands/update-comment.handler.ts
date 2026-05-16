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
  toUpdateComment,
  UpdateCommentCommand,
} from './update-comment.command';

@injectable()
@requestHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements RequestHandler<UpdateCommentCommand, PostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: UpdateCommentCommand): Promise<PostData> {
    const { param, request } = command;
    const { id: postId, commentId } = param;

    this.logger.info({ postId }, `Creating comment for post: ${postId}`);

    const post = await this.convex.query(api.posts.find, {
      id: postId as Id<'posts'>,
    });

    if (post == null) {
      throw new ValidationError({
        details: [
          {
            path: '/id',
            message: `postId ${postId} is invalid`,
          },
        ],
      });
    }

    const toUpdate = post.comments.find((comment) => comment.id === commentId);

    if (toUpdate == null) {
      throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    const rest = post.comments.filter((comment) => comment.id !== commentId);

    const updated = await this.convex.mutation(
      api.posts.update,
      toUpdateComment(request, toUpdate, rest, post._id),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    return toData({ data: toPost(updated) });
  }
}
