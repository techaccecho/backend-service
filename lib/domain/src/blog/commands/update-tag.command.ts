import type { AttributeEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../blog.schema.js';

export const UpdateTagParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  tagId: Type.String({
    description: 'The id of the tag',
    format: 'uuid',
  }),
});

export type UpdateTagParams = Static<typeof UpdateTagParamsSchema>;

export const UpdateTagSchema = Type.Partial(
  Type.Object({
    name: Type.String({ description: 'Tag name' }),
    value: Type.String({ description: 'Tag value' }),
  }),
);

export type UpdateTag = Static<typeof UpdateTagSchema>;

export type UpdateTagRequest = {
  params: UpdateTagParams;
  update: UpdateTag;
  existing: AttributeEntity;
  blog: Doc<'blogs'>;
};

export const toUpdateTagArgs = (request: UpdateTagRequest): UpdateBlogArgs => {
  const { params, update, existing, blog } = request;
  const { tagId } = params;

  const updateTag = {
    ...existing,
    name: update.name ?? existing.name,
    value: update.value ?? existing.value,
    updatedAt: now(),
  };

  const restTags = blog.tags.filter((tag) => tag.id !== tagId);

  return {
    id: blog._id,
    updates: {
      tags: [...restTags, updateTag],
    },
  };
};

export class UpdateTagCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateTagRequest) {
    super();
  }
}
