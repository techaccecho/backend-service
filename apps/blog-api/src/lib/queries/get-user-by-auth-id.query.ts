import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { UserData } from '../schemas';

export const GetUserByAuthIdParamSchema = Type.Object({
  authId: Type.String({
    description: 'The authId of the user',
  }),
});

export type GetUserByAuthId = Static<typeof GetUserByAuthIdParamSchema>;

export class GetUserByAuthIdQuery extends RequestData<UserData> {
  constructor(public readonly request: GetUserByAuthId) {
    super();
  }
}
