import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import { PaginatedBlogData } from '../blog.schema.js';

export type GetBlogsRequest = {
  query: Query;
};

export class GetBlogsQuery extends RequestData<PaginatedBlogData> {
  constructor(public readonly request: GetBlogsRequest) {
    super();
  }
}
