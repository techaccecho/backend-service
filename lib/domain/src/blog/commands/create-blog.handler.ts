import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { CreateBlogCommand, toCreateBlogArgs } from './create-blog.command.js';
import { BlogData, toBlog } from '../blog.schema.js';

@injectable()
@requestHandler(CreateBlogCommand)
export class CreatePostHandler
  implements RequestHandler<CreateBlogCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateBlogCommand): Promise<BlogData> {
    const { request } = command;
    const { create } = request;
    const { title } = create;

    this.logger.info({ title: title }, `Creating blog: ${title}`);

    const args = toCreateBlogArgs(request);

    await this.convex.mutation(api.blogs.create, args);

    const created = await this.convex.query(api.blogs.find, { id: args.id });

    if (created == null) {
      throw new NotFoundError({ resource: `blog with id ${args.id}` });
    }

    return toData({ data: toBlog(created)});
  }
}
