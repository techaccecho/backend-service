import { api } from '@backend-service/convex';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { NotFoundError, TOKENS } from '../../../lib';
import { DeletePostCommand } from './delete-post.command';

@injectable()
@requestHandler(DeletePostCommand)
export class DeletePostHandler
  implements RequestHandler<DeletePostCommand, void>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeletePostCommand): Promise<void> {
    const { id } = command.request;

    this.logger.info({ id }, `Deleting post: ${id}`);

    const existing = await this.convex.query(api.posts.find, { id });

    if (existing == null) {
      throw new NotFoundError({ resource: `post with id ${id}` });
    }

    await this.convex.mutation(api.posts.remove, {
      id: existing._id,
    });
  }
}
