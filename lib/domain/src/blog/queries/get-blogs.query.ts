import type { Doc } from '@lib/data';
import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import type { PaginatedBlogData } from '../blog.schema.js';

export type GetBlogsRequest = {
  query: Query;
  user?: Doc<'users'>;
};

export class GetBlogsQuery extends RequestData<PaginatedBlogData> {
  constructor(public readonly request: GetBlogsRequest) {
    super();
  }
}
