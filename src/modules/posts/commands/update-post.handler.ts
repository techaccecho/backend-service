import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex/_generated/api';
import {
  AsyncValidation,
  NotFoundError,
  type PostData,
  toData,
  ValidationError,
} from '../../../lib';
import { TOKENS } from '../../../tokens';
import { toPost } from '../posts.schema';
import { toUpdatePostArgs, UpdatePostCommand } from './update-post.command';

@injectable()
@requestHandler(UpdatePostCommand)
export class UpdatePostHandler
  implements RequestHandler<UpdatePostCommand, PostData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: UpdatePostCommand): Promise<PostData> {
    const { request } = command;
    const { id } = command.param;

    this.logger.info({ id: id }, `Updating post: ${id}`);

    const validationDetails = await this.validation
      .validator()
      .notEmpty({ value: request })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const existing = await this.convex.query(api.posts.find, { id });

    if (existing == null) {
      throw new NotFoundError({ resource: `post with id ${id}` });
    }

    const updated = await this.convex.mutation(
      api.posts.update,
      toUpdatePostArgs(existing._id, request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `post with id ${id}` });
    }

    return toData({ data: toPost(updated) });
  }
}
