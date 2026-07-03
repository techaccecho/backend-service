import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const GetBlogParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type GetBlogParams = Static<typeof GetBlogParamsSchema>;

export type GetBlogRequest = {
  params: GetBlogParams;
};

export class GetBlogQuery extends RequestData<BlogData> {
  constructor(public readonly request: GetBlogRequest) {
    super();
  }
}
