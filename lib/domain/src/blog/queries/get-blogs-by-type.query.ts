import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import type { PaginatedBlogData } from '../blog.schema.js';

export type GetBlogsByTypeRequest = {
  type: 'post' | 'thread' | 'none';
  query: Query;
};

export class GetBlogsByTypeQuery extends RequestData<PaginatedBlogData> {
  constructor(public readonly request: GetBlogsByTypeRequest) {
    super();
  }
}
