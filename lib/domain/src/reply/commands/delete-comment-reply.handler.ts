import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  DeleteCommentReplyCommand,
  toDeleteCommentReplyArgs,
} from './delete-comment-reply.command.js';
import { BlogData, toBlog } from '../../blog/index.js';

@injectable()
@requestHandler(DeleteCommentReplyCommand)
export class DeleteCommentReplyHandler
  implements RequestHandler<DeleteCommentReplyCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteCommentReplyCommand): Promise<BlogData> {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;

    this.logger.info({ id }, `Deleting reply: ${id}`);

    const args = toDeleteCommentReplyArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
