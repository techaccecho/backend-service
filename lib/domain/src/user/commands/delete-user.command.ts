import type { Doc } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';

export const DeleteUserParamsSchema = Type.Object({
  userId: Type.String({
    description: 'The id of the user',
    format: 'uuid',
  }),
});

export type DeleteUserParamsSchema = Static<typeof DeleteUserParamsSchema>;

export type DeleteUserRequest = {
  params: DeleteUserParamsSchema;
  existing: Doc<'users'>;
};

export class DeleteUserCommand extends RequestData<void> {
  constructor(public readonly request: DeleteUserRequest) {
    super();
  }
}
