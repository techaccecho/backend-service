import { api } from '@lib/data';
import { now, Tokens, uuid } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { toBlogEntity } from '../blog.schema.js';
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
    const { existing, user } = request;
    const { id } = existing;

    this.logger.info({ id }, `Deleting blog: ${id}`);

    if (user?.role === 'admin') {
      await this.convex.mutation(api.blogs.createAdminAction, {
        id: uuid(),
        blogId: existing.id,
        blog: toBlogEntity(existing),
        adminId: user.id,
        adminAlias: user.alias,
        action: 'hard_delete',
        reason: request.delete?.reason?.trim() || 'Hard deleted by admin',
        createdAt: now(),
      });
    }

    await this.convex.mutation(api.blogs.remove, {
      id: existing._id,
    });
  }
}
