import type { CreateUserArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { UserData } from '../user.schema.js';

export const CreateUserSchema = Type.Object({
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
  avatar: Type.Optional(
    Type.Object({
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
  ),
});

export type CreateUser = Static<typeof CreateUserSchema>;

export type CreateUserRequest = {
  create: CreateUser;
};

export const toCreateUserArgs = (
  request: CreateUserRequest,
): CreateUserArgs => {
  const { create } = request;
  const { avatar } = create;

  const createPreferences =
    create.preferences?.map((preference) => ({
      id: uuid(),
      name: preference.name,
      value: preference.value,
      createdAt: now(),
      updatedAt: null,
    })) ?? [];

  const createAvatar =
    (avatar && {
      id: uuid(),
      type: avatar.type,
      url: avatar.url ?? null,
      content: avatar.content ?? null,
      createdAt: now(),
      updatedAt: null,
    }) ||
    null;

  return {
    id: uuid(),
    authId: create.authId ?? null,
    email: create.email ?? null,
    alias: create.alias ?? null,
    firstName: create.firstName ?? null,
    lastName: create.lastName ?? null,
    dateOfBirth: create.dateOfBirth ?? null,
    bio: create.bio ?? null,
    preferences: createPreferences,
    role: create.role ?? 'user',
    isLocked: create.isLocked ?? false,
    avatar: createAvatar,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now(),
  };
};

export class CreateUserCommand extends RequestData<UserData> {
  constructor(public readonly request: CreateUserRequest) {
    super();
  }
}
