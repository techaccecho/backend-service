import { type Static, Type } from '@sinclair/typebox';
import type { Doc } from '../../../convex';
import { toISO } from '../util';
import { DataSchema, PaginatedDataSchema } from './data.schema';

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  authId: Type.Union([Type.String(), Type.Null()]),
  email: Type.Union([Type.String({ format: 'email' })]),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
  dateOfBirth: Type.Union([Type.String(), Type.Null()]),
  bio: Type.Union([Type.String(), Type.Null()]),
  preferences: Type.Array(
    Type.Object({ interests: Type.Array(Type.String()) }),
  ),
  role: Type.Union([Type.Literal('user'), Type.Literal('admin')]),
  isLocked: Type.Boolean(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
  lastActivityAt: Type.String({ format: 'date-time' }),
});

export type User = Static<typeof UserSchema>;

export const UserDataSchema = DataSchema(UserSchema);

export type UserData = Static<typeof UserDataSchema>;

export const PaginatedUserDataSchema = PaginatedDataSchema(UserSchema);

export type PaginatedUserData = Static<typeof PaginatedUserDataSchema>;

export const toUser = (request: Doc<'users'>): User => ({
  id: request.id,
  authId: request.authId,
  email: request.email,
  alias: request.alias,
  firstName: request.firstName,
  lastName: request.lastName,
  dateOfBirth: request.dateOfBirth,
  bio: request.bio,
  preferences: request.preferences,
  role: request.role,
  isLocked: request.isLocked,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt),
});
