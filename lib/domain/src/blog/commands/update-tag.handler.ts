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
import { toUpdateTagArgs, UpdateTagCommand } from './update-tag.command.js';

@injectable()
@requestHandler(UpdateTagCommand)
export class UpdateTagHandler
  implements RequestHandler<UpdateTagCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: UpdateTagCommand): Promise<BlogData> {
    const { request } = command;
    const { params, update } = request;
    const { tagId, blogId } = params;

    this.logger.info({ tagId }, `Updating tag: ${tagId}`);

    const validationDetails = await this.validation
      .validator()
      .notEmpty({ value: update })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const updated = await this.convex.mutation(
      api.blogs.update,
      toUpdateTagArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
