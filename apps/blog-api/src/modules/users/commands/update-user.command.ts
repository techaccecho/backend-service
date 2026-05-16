import type { Id, UpdateUserArgs } from '@backend-service/convex';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { type IdParam, IdParamSchema, type UserData } from '../../../lib';

export const UpdateUserParamSchema = IdParamSchema(
  'The id of the user to update',
);

export const UpdateUserSchema = Type.Partial(
  Type.Object({
    email: Type.Optional(Type.String()),
    alias: Type.Optional(Type.String()),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    dateOfBirth: Type.Optional(Type.String()),
    bio: Type.Optional(Type.String()),
    preferences: Type.Optional(
      Type.Array(
        Type.Object({
          interests: Type.Array(Type.String()),
        }),
      ),
    ),
    role: Type.Optional(
      Type.Union([Type.Literal('user'), Type.Literal('admin')]),
    ),
    isLocked: Type.Optional(Type.Boolean()),
  }),
);

export type UpdateUser = Static<typeof UpdateUserSchema>;

export const toUpdateUserArgs = (
  id: Id<'users'>,
  request: UpdateUser,
): UpdateUserArgs => ({
  id,
  updates: {
    ...request,
    updatedAt: Date.now(),
    lastActivityAt: Date.now(),
  },
});

export class UpdateUserCommand extends RequestData<UserData> {
  constructor(
    public readonly param: IdParam,
    public readonly request: UpdateUser,
  ) {
    super();
  }
}
