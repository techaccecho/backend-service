import { api } from '@lib/data';
import { Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { DeleteBlogCommand } from './delete-blog.command.js';

@injectable()
@requestHandler(DeleteBlogCommand)
export class DeletePostHandler
  implements RequestHandler<DeleteBlogCommand, void>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteBlogCommand): Promise<void> {
    const { request } = command;
    const { existing } = request;
    const { id } = existing;

    this.logger.info({ id }, `Deleting blog: ${id}`);

    await this.convex.mutation(api.blogs.remove, {
      id: existing._id,
    });
  }
}
