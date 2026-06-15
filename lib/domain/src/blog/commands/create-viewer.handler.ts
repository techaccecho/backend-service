import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  CreateViewerCommand,
  toCreateViewerArgs,
} from './create-viewer.command.js';
import { BlogData, toBlog } from '../blog.schema.js';

@injectable()
@requestHandler(CreateViewerCommand)
export class CreateViewerHandler
  implements RequestHandler<CreateViewerCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateViewerCommand): Promise<BlogData> {
    const { request } = command;
    const { params } = request;
    const { blogId } = params;

    this.logger.info({ blogId }, `Creating viewer for blog: ${blogId}`);

    const args = toCreateViewerArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
