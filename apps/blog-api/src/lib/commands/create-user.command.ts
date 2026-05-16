import type { CreateUserArgs } from '@backend-service/convex';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { UserData } from '../schemas';

export const CreateUserSchema = Type.Object({
  authId: Type.String({
    description: 'The authId of the user',
  }),
  email: Type.String({
    format: 'email',
    description: 'The email of the user',
  }),
  alias: Type.Optional(Type.String({ description: 'The alias of the user' })),
  firstName: Type.Optional(
    Type.String({ description: 'The firstName of the user' }),
  ),
  lastName: Type.Optional(
    Type.String({ description: 'The lastName of the user' }),
  ),
  dateOfBirth: Type.Optional(
    Type.String({ description: 'The dateOfBirth of the user' }),
  ),
  bio: Type.Optional(Type.String({ description: 'The biography of the user' })),
  preferences: Type.Optional(
    Type.Array(
      Type.Object(
        {
          interests: Type.Array(Type.String()),
        },
        { default: [], description: 'The role of the user' },
      ),
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
});

export type CreateUser = Static<typeof CreateUserSchema>;

export const toCreateUserArgs = (
  request: CreateUser,
  userId: string,
): CreateUserArgs => ({
  ...request,
  id: userId,
  authId: request.authId ?? null,
  email: request.email ?? null,
  alias: request.alias ?? null,
  firstName: request.firstName ?? null,
  lastName: request.lastName ?? null,
  dateOfBirth: request.dateOfBirth ?? null,
  bio: request.bio ?? null,
  preferences: request.preferences ?? [],
  role: request.role ?? 'user',
  isLocked: request.isLocked ?? false,
  createdAt: Date.now(),
  updatedAt: null,
  lastActivityAt: Date.now(),
});

export class CreateUserCommand extends RequestData<UserData> {
  constructor(public readonly request: CreateUser) {
    super();
  }
}
