import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import { PaginatedApiData } from '../api.schema.js';

export type GetApisRequest = {
  query: Query;
};

export class GetApisQuery extends RequestData<PaginatedApiData> {
  constructor(public readonly request: GetApisRequest) {
    super();
  }
}
