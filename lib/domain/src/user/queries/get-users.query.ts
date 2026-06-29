import type { Query } from '@lib/util';
import { RequestData } from 'mediatr-ts';
import { PaginatedUserData, PaginatedArchivedUserData } from '../user.schema.js';

export type GetUsersRequest = {
  query: Query;
};

export class GetUsersQuery extends RequestData<PaginatedUserData> {
  constructor(public readonly request: GetUsersRequest) {
    super();
  }
}

export type GetArchivedUsersRequest = {
  query: Query;
};

export class GetArchivedUsersQuery extends RequestData<PaginatedArchivedUserData> {
  constructor(public readonly request: GetArchivedUsersRequest) {
    super();
  }
}
