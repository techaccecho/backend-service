import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { UserData } from '../user.schema.js';

export const GetUserByAuthIdParamsSchema = Type.Object({
  authId: Type.String({
    description: 'The authId of the user',
  }),
});

export type GetUserByAuthIdParams = Static<typeof GetUserByAuthIdParamsSchema>;

export type GetUserByAUthIdRequest = {
  params: GetUserByAuthIdParams;
};

export class GetUserByAuthIdQuery extends RequestData<UserData> {
  constructor(public readonly request: GetUserByAUthIdRequest) {
    super();
  }
}
