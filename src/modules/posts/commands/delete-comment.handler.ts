import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';
import { NotFoundError, type PostData, toData } from '../../../lib';
import { TOKENS } from '../../../tokens';
import { toPost } from '../posts.schema';
import {
  DeleteCommentCommand,
  toDeleteComment,
} from './delete-comment.command';

@injectable()
@requestHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements RequestHandler<DeleteCommentCommand, PostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteCommentCommand): Promise<PostData> {
    const { id: postId, commentId } = command.request;

    this.logger.info({ commentId }, `Deleting comment : ${commentId}`);

    const post = await this.convex.query(api.posts.find, {
      id: postId as Id<'posts'>,
    });

    if (post == null) {
      throw new NotFoundError({ resource: `post with id ${postId}` });
    }

    const toDelete = post.comments.find((comment) => comment.id === commentId);

    if (toDelete == null) {
      throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    const rest = post.comments.filter((comment) => comment.id !== commentId);

    const updated = await this.convex.mutation(
      api.posts.update,
      toDeleteComment(rest, post._id),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    return toData({ data: toPost(updated) });
  }
}
