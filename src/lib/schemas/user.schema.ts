import { type Static, Type } from '@sinclair/typebox';
import { DataSchema, PaginatedDataSchema } from './data.schema';

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  authId: Type.Union([Type.String(), Type.Null()]),
  email: Type.Union([Type.String({ format: 'email' }), Type.Null()]),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
  dateOfBirth: Type.Union([Type.String(), Type.Null()]),
  bio: Type.Union([Type.String(), Type.Null()]),
  preferences: Type.Array(Type.Object({ interests: Type.Array(Type.String()) })),
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
