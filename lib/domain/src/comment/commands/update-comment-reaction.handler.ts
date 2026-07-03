import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../../blog/index.js';
import {
  toUpdateCommentReactionArgs,
  UpdateCommentReactionCommand,
} from './update-comment-reaction.command.js';

@injectable()
@requestHandler(UpdateCommentReactionCommand)
export class UpdateCommentReactionHandler
  implements RequestHandler<UpdateCommentReactionCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: UpdateCommentReactionCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { reactionId, blogId } = params;

    this.logger.info({ reactionId }, `Updating reaction: ${reactionId}`);

    const updated = await this.convex.mutation(
      api.blogs.update,
      toUpdateCommentReactionArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
