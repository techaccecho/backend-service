import type { Doc, UpdateBlogArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';
import type { UpdateBlogParams } from './update-blog.command.js';

export const SoftDeleteBlogSchema = Type.Object({
  reason: Type.String({
    minLength: 1,
    description: 'The admin reason for removing the blog',
  }),
});

export type SoftDeleteBlog = Static<typeof SoftDeleteBlogSchema>;

export type SoftDeleteBlogRequest = {
  params: UpdateBlogParams;
  softDelete: SoftDeleteBlog;
  existing: Doc<'blogs'>;
  user: Doc<'users'>;
};

export const toSoftDeleteBlogArgs = (
  request: SoftDeleteBlogRequest,
): UpdateBlogArgs => ({
  id: request.existing._id,
  updates: {
    deletedAt: now(),
    updatedAt: now(),
    lastActivityAt: now(),
  },
});

export class SoftDeleteBlogCommand extends RequestData<BlogData> {
  constructor(public readonly request: SoftDeleteBlogRequest) {
    super();
  }
}
