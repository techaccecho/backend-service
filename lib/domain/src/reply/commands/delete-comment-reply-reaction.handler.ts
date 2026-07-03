import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../../blog/index.js';
import {
  DeleteCommentReplyReactionCommand,
  toDeleteCommentReplyReactionArgs,
} from './delete-comment-reply-reaction.command.js';

@injectable()
@requestHandler(DeleteCommentReplyReactionCommand)
export class DeleteCommentReplyReactionHandler
  implements RequestHandler<DeleteCommentReplyReactionCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteCommentReplyReactionCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { reactionId, blogId } = params;

    this.logger.info({ reactionId }, `Deleting reaction: ${reactionId}`);

    const args = toDeleteCommentReplyReactionArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
