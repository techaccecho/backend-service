import type { AttributeEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../blog.schema.js';

export const DeleteTagParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type DeleteTagParamsSchema = Static<typeof DeleteTagParamsSchema>;

export type DeleteTagRequest = {
  params: DeleteTagParamsSchema;
  existing: AttributeEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteTagArgs = (request: DeleteTagRequest): UpdateBlogArgs => {
  const { existing, blog } = request;
  const restTags = blog.tags.filter((tag) => tag.id !== existing.id);

  return {
    id: blog._id,
    updates: {
      tags: restTags,
    },
  };
};

export class DeleteTagCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteTagRequest) {
    super();
  }
}
