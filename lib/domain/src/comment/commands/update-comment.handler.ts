import { api } from '@lib/data';
import {
  NotFoundError,
  toData,
  Tokens,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  toUpdateCommentArgs,
  UpdateCommentCommand,
} from './update-comment.command.js';
import { BlogData, toBlog } from '../../blog/index.js';

@injectable()
@requestHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements RequestHandler<UpdateCommentCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient
  ) {}

  async handle(command: UpdateCommentCommand): Promise<BlogData> {
    const { request } = command;
    const { params, update } = request;
    const { commentId, blogId } = params;

    this.logger.info({ commentId }, `Updating comment: ${commentId}`);

    const updated = await this.convex.mutation(
      api.blogs.update,
      toUpdateCommentArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
