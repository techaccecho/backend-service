import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  CreateCommentReactionCommand,
  toCreateCommentReactionArgs,
} from './create-comment-reaction.command.js';
import { BlogData, toBlog } from '../../blog/index.js';

@injectable()
@requestHandler(CreateCommentReactionCommand)
export class CreateCommentReactionHandler
  implements RequestHandler<CreateCommentReactionCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateCommentReactionCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { blogId, commentId } = params;

    this.logger.info({ commentId }, `Creating reaction for comment: ${commentId}`);

    const args = toCreateCommentReactionArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
