import { api } from '@lib/data';
import { NotFoundError, Tokens, toData, ValidationError } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../blog.schema.js';
import { sanitizeBlogContent, validateBlogContent } from '../blog-content.js';
import { CreateBlogCommand, toCreateBlogArgs } from './create-blog.command.js';

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
    const sanitizedContent = sanitizeBlogContent(create.content);
    const contentErrors = validateBlogContent(sanitizedContent);

    if (contentErrors.length > 0) {
      throw new ValidationError({
        details: contentErrors.map((message) => ({
          path: '/content',
          message,
        })),
      });
    }

    this.logger.info({ title: title }, `Creating blog: ${title}`);

    const args = toCreateBlogArgs({
      ...request,
      create: {
        ...create,
        content: sanitizedContent,
      },
    });

    await this.convex.mutation(api.blogs.create, args);

    const created = await this.convex.query(api.blogs.find, { id: args.id });

    if (created == null) {
      throw new NotFoundError({ resource: `blog with id ${args.id}` });
    }

    return toData({ data: toBlog(created) });
  }
}
