import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../../blog/index.js';
import {
  CreateCommentViewerCommand,
  toCreateCommentViewerArgs,
} from './create-comment-viewer.command.js';

@injectable()
@requestHandler(CreateCommentViewerCommand)
export class CreateCommentViewerHandler
  implements RequestHandler<CreateCommentViewerCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateCommentViewerCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { blogId, commentId } = params;

    this.logger.info(
      { commentId },
      `Creating viewer for comment: ${commentId}`,
    );

    const args = toCreateCommentViewerArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
