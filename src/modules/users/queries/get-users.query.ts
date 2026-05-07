import { RequestData } from 'mediatr-ts';
import type { PaginatedUserData, Query } from '../../../lib';

export class GetUsersQuery extends RequestData<PaginatedUserData> {
  constructor(public readonly request: Query) {
    super();
  }
}
