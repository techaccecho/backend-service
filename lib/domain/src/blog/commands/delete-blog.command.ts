import type { Doc } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';

export const DeleteBlogParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type DeleteBlogRequest = {
  params: DeleteBlogParamsSchema;
  existing: Doc<'blogs'>;
};

export type DeleteBlogParamsSchema = Static<typeof DeleteBlogParamsSchema>;

export class DeleteBlogCommand extends RequestData<void> {
  constructor(public readonly request: DeleteBlogRequest) {
    super();
  }
}
