import type { Doc } from '@lib/data';
import { DataSchema, PaginatedDataSchema, toISO } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import {
  AttachmentSchema,
  AttributeSchema,
  toAttachment,
  toAttribute,
} from '../util/index.js';

export const UserSchema = Type.Object({
  _id: Type.String(),
  id: Type.String({ format: 'uuid' }),
  authId: Type.Union([Type.String(), Type.Null()]),
  email: Type.Union([Type.String({ format: 'email' })]),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
  dateOfBirth: Type.Union([Type.String(), Type.Null()]),
  bio: Type.Union([Type.String(), Type.Null()]),
  preferences: Type.Array(AttributeSchema),
  role: Type.Union([Type.Literal('user'), Type.Literal('admin')]),
  isLocked: Type.Boolean(),
  avatar: Type.Union([AttachmentSchema, Type.Null()]),
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
  _id: request._id,
  id: request.id,
  authId: request.authId,
  email: request.email,
  alias: request.alias,
  firstName: request.firstName,
  lastName: request.lastName,
  dateOfBirth: request.dateOfBirth,
  bio: request.bio,
  preferences: request.preferences.map(toAttribute),
  role: request.role,
  isLocked: request.isLocked,
  avatar: (request.avatar && toAttachment(request.avatar)) || null,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt),
});

export const ArchivedUserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
  email: Type.Union([Type.String({ format: 'email' })]),
  bio: Type.Union([Type.String(), Type.Null()]),
  role: Type.Union([Type.Literal('user'), Type.Literal('admin')]),
  isLocked: Type.Boolean(),
  createdAt: Type.String({ format: 'date-time' }),
  lastActivityAt: Type.String({ format: 'date-time' }),
});

export type ArchivedUser = Static<typeof ArchivedUserSchema>;

export const ArchivedUserDataSchema = DataSchema(ArchivedUserSchema);
export type ArchivedUserData = Static<typeof ArchivedUserDataSchema>;
export const PaginatedArchivedUserDataSchema =
  PaginatedDataSchema(ArchivedUserSchema);
export type PaginatedArchivedUserData = Static<
  typeof PaginatedArchivedUserDataSchema
>;

export const toArchivedUser = (request: Doc<'users'>): ArchivedUser => ({
  id: request.id,
  alias: request.alias,
  firstName: request.firstName,
  lastName: request.lastName,
  email: request.email,
  bio: request.bio,
  role: request.role,
  isLocked: request.isLocked,
  createdAt: toISO(request.createdAt),
  lastActivityAt: toISO(request.lastActivityAt),
});
