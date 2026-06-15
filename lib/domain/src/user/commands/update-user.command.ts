import type { Doc, UpdateUserArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { UserData } from '../user.schema.js';

export const UpdateUserParamsSchema = Type.Object({
  userId: Type.String({
    description: 'The id of the user',
    format: 'uuid',
  }),
});

export type UpdateUserParams = Static<typeof UpdateUserParamsSchema>;

const UpdateAttachmentSchema = Type.Partial(
  Type.Object({
    id: Type.String({
      format: 'uuid',
      description: 'The id of the attachment',
    }),
    type: Type.Union([Type.Literal('media/image')], {
      description: 'Type of attachment',
    }),
    url: Type.Optional(Type.String({ description: 'URL of the attachment' })),
    content: Type.Optional(
      Type.String({
        description: 'Base64 encoded actual content of the attachment',
      }),
    ),
  }),
);

type UpdateAttachment = Static<typeof UpdateAttachmentSchema>;

export const UpdateUserSchema = Type.Partial(
  Type.Object({
    authId: Type.String({
      description: 'The Auth id',
    }),
    email: Type.String({
      format: 'email',
      description: 'The email ',
    }),
    alias: Type.Optional(Type.String({ description: 'The alias' })),
    firstName: Type.Optional(Type.String({ description: 'The firstName' })),
    lastName: Type.Optional(Type.String({ description: 'The lastName' })),
    dateOfBirth: Type.Optional(Type.String({ description: 'The dateOfBirth' })),
    bio: Type.Optional(Type.String({ description: 'The biography' })),
    preferences: Type.Optional(
      Type.Array(
        Type.Object({
          name: Type.String(),
          value: Type.String(),
        }),
        { default: [], description: 'The preferences' },
      ),
    ),
    role: Type.Optional(
      Type.Union([Type.Literal('user'), Type.Literal('admin')], {
        default: 'user',
        description: 'The role of the user',
      }),
    ),
    isLocked: Type.Optional(
      Type.Boolean({ description: 'Whether the user is locked' }),
    ),
  }),
);

export type UpdateUser = Static<typeof UpdateUserSchema>;

export type UpdateUserRequest = {
  params: UpdateUserParams;
  update: UpdateUser;
  existing: Doc<'users'>;
};

export const toUpdateUserArgs = (
  request: UpdateUserRequest,
): UpdateUserArgs => {
  const { update, existing } = request;

  return {
    id: existing._id,
    updates: {
      authId: update.authId ?? existing.authId,
      email: update.email ?? existing.email,
      alias: update.alias ?? existing.alias,
      firstName: update.firstName ?? existing.firstName,
      lastName: update.lastName ?? existing.lastName,
      dateOfBirth: update.dateOfBirth ?? existing.dateOfBirth,
      bio: update.bio ?? existing.bio,
      role: update.role ?? existing.role,
      isLocked: update.isLocked ?? existing.isLocked,
      updatedAt: now(),
      lastActivityAt: now(),
    },
  };
};

export class UpdateUserCommand extends RequestData<UserData> {
  constructor(public readonly request: UpdateUserRequest) {
    super();
  }
}
