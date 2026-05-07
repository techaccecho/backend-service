import { RequestData } from 'mediatr-ts';
import {
  type IdParam,
  IdParamSchema,
  type UserData,
} from '../../../lib';

export const GetUserParamSchema = IdParamSchema('The id of the user to fetch');

export class GetUserQuery extends RequestData<UserData> {
  constructor(public readonly request: IdParam) {
    super();
  }
}
