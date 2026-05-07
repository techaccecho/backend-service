import type { Doc } from '../../../convex/_generated/dataModel';
import { toISO, type User } from '../../lib';

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
