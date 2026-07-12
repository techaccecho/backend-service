import type { Doc } from '@lib/data';
import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import type { PaginatedBlogData } from '../blog.schema.js';

export type GetBlogsByTypeRequest = {
  type: 'post' | 'thread' | 'none';
  query: Query;
  user?: Doc<'users'>;
};

export class GetBlogsByTypeQuery extends RequestData<PaginatedBlogData> {
  constructor(public readonly request: GetBlogsByTypeRequest) {
    super();
  }
}
