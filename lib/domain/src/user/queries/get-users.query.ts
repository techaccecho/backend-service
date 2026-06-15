import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import { PaginatedUserData } from '../user.schema.js';

export type GetUsersRequest = {
  query: Query;
};

export class GetUsersQuery extends RequestData<PaginatedUserData> {
  constructor(public readonly request: GetUsersRequest) {
    super();
  }
}
