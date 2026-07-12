import { api } from '@lib/data';
import { NotFoundError, now, Tokens, toData, uuid } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type BlogData, toBlog, toBlogEntity } from '../blog.schema.js';
import {
  SoftDeleteBlogCommand,
  toSoftDeleteBlogArgs,
} from './soft-delete-blog.command.js';

@injectable()
@requestHandler(SoftDeleteBlogCommand)
export class SoftDeleteBlogHandler
  implements RequestHandler<SoftDeleteBlogCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: SoftDeleteBlogCommand): Promise<BlogData> {
    const { request } = command;
    const { existing, softDelete, user } = request;

    this.logger.info({ id: existing.id }, `Soft deleting blog: ${existing.id}`);

    await this.convex.mutation(api.blogs.createAdminAction, {
      id: uuid(),
      blogId: existing.id,
      blog: toBlogEntity(existing),
      adminId: user.id,
      adminAlias: user.alias,
      action: 'soft_delete',
      reason: softDelete.reason.trim(),
      createdAt: now(),
    });

    const updated = await this.convex.mutation(
      api.blogs.update,
      toSoftDeleteBlogArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${existing.id}` });
    }

    return toData({ data: toBlog(updated) });
  }
}
