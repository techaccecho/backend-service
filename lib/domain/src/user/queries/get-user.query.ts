import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { UserData } from '../user.schema.js';

export const GetUserParamsSchema = Type.Object({
  userId: Type.String({
    description: 'The id of the user',
    format: 'uuid',
  }),
});

export type GetUserParams = Static<typeof GetUserParamsSchema>;

export type GetUserRequest = {
  params: GetUserParams;
};

export class GetUserQuery extends RequestData<UserData> {
  constructor(public readonly request: GetUserRequest) {
    super();
  }
}
