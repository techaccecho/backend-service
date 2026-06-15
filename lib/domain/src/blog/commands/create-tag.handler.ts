import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { CreateTagCommand, toCreateTagArgs } from './create-tag.command.js';
import { BlogData, toBlog } from '../blog.schema.js';

@injectable()
@requestHandler(CreateTagCommand)
export class CreateTagHandler
  implements RequestHandler<CreateTagCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateTagCommand): Promise<BlogData> {
    const { request } = command;
    const { params, create } = request;
    const { blogId } = params;
    const { name } = create;

    this.logger.info({ name }, `Creating tag: ${name}`);

    const args = toCreateTagArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
