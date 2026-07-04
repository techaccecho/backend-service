import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../../blog/index.js';
import {
  toUpdateCommentReplyArgs,
  UpdateCommentReplyCommand,
} from './update-comment-reply.command.js';

@injectable()
@requestHandler(UpdateCommentReplyCommand)
export class UpdateCommentReplyHandler
  implements RequestHandler<UpdateCommentReplyCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: UpdateCommentReplyCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { replyId, blogId } = params;

    this.logger.info({ replyId }, `Updating reply: ${replyId}`);

    const updated = await this.convex.mutation(
      api.blogs.update,
      toUpdateCommentReplyArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
