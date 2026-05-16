import { RequestData } from 'mediatr-ts';
import type { PaginatedPostData, Query } from '../../../lib';

export class GetBlogsQuery extends RequestData<PaginatedPostData> {
  constructor(public readonly request: Query) {
    super();
  }
}
