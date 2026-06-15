import type { Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../blog.schema.js';

export const CreateTagParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type CreateTagParams = Static<typeof CreateTagParamsSchema>;

export const CreateTagSchema = Type.Object({
  name: Type.String({ description: 'Tag name' }),
  value: Type.String({ description: 'Tag value' }),
});

export type CreateTag = Static<typeof CreateTagSchema>;

export type CreateTagRequest = {
  params: CreateTagParams;
  create: CreateTag;
  existing: Doc<'blogs'>;
};

export const toCreateTagArgs = (request: CreateTagRequest): UpdateBlogArgs => {
  const { create, existing } = request;

  const createTag = {
    id: uuid(),
    name: create.name,
    value: create.value,
    createdAt: now(),
    updatedAt: null,
  };

  return {
    id: existing._id,
    updates: {
      tags: [...existing.tags, createTag],
    },
  };
};

export class CreateTagCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateTagRequest) {
    super();
  }
}
