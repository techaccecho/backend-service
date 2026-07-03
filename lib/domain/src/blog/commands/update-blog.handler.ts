import { api } from '@lib/data';
import {
  AsyncValidation,
  NotFoundError,
  Tokens,
  toData,
  ValidationError,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog } from '../blog.schema.js';
import { toUpdateBlogArgs, UpdateBlogCommand } from './update-blog.command.js';

@injectable()
@requestHandler(UpdateBlogCommand)
export class UpdateBlogHandler
  implements RequestHandler<UpdateBlogCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: UpdateBlogCommand): Promise<BlogData> {
    const { request } = command;
    const { params, update } = request;
    const { blogId } = params;

    this.logger.info({ blogId }, `Updating blog: ${blogId}`);

    const validationDetails = await this.validation
      .validator()
      .notEmpty({ value: update })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const updated = await this.convex.mutation(
      api.blogs.update,
      toUpdateBlogArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
