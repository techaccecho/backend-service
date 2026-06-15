import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  DeleteCommentReactionCommand,
  toDeleteCommentReactionArgs,
} from './delete-comment-reaction.command.js';
import { BlogData, toBlog } from '../../blog/index.js';

@injectable()
@requestHandler(DeleteCommentReactionCommand)
export class DeleteCommentReactionHandler
  implements RequestHandler<DeleteCommentReactionCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteCommentReactionCommand): Promise<BlogData> {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;

    this.logger.info({ id }, `Deleting reaction: ${id}`);

    const args = toDeleteCommentReactionArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
