import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    createdAt: v.string(),
    dateOfBirth: v.string(),
    deletedAt: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    updatedAt: v.string(),
    userAlias: v.string(),
  }),
});
