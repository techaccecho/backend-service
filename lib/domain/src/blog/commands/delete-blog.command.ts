import type { Doc } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';

export const DeleteBlogParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type DeleteBlogParamsSchema = Static<typeof DeleteBlogParamsSchema>;

export const DeleteBlogSchema = Type.Partial(
  Type.Object({
    reason: Type.String({
      minLength: 1,
      description: 'The admin reason for deleting the blog',
    }),
  }),
);

export type DeleteBlog = Static<typeof DeleteBlogSchema>;

export type DeleteBlogRequest = {
  params: DeleteBlogParamsSchema;
  existing: Doc<'blogs'>;
  user?: Doc<'users'>;
  delete?: DeleteBlog;
};

export class DeleteBlogCommand extends RequestData<void> {
  constructor(public readonly request: DeleteBlogRequest) {
    super();
  }
}
