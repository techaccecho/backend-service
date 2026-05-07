import {
  defineSchema,
  defineTable,
  paginationOptsValidator,
} from 'convex/server';
import { type Infer, v } from 'convex/values';

export const UserEntitySchema = v.object({
  id: v.string(),
  authId: v.nullable(v.string()),
  email: v.nullable(v.string()),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string()),
  dateOfBirth: v.nullable(v.string()),
  bio: v.nullable(v.string()),
  preferences: v.array(
    v.object({
      interests: v.array(v.string()),
    }),
  ),
  role: v.union(v.literal('user'), v.literal('admin')),
  isLocked: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number(),
});

export type UserEntity = Infer<typeof UserEntitySchema>;

export const AuthorEntitySchema = v.object({
  id: v.string(),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string()),
});

export type AuthorEntity = Infer<typeof AuthorEntitySchema>;

export const ReactionEntitySchema = v.object({
  id: v.string(),
  type: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type ReactionEntity = Infer<typeof ReactionEntitySchema>;

export const MediaEntitySchema = v.object({
  id: v.string(),
  type: v.union(v.literal('image')),
  url: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type MediaEntity = Infer<typeof MediaEntitySchema>;

export const StatsEntitySchema = v.object({
  viewsCount: v.number(),
  commentsCount: v.number(),
  reactions: v.array(
    v.object({
      type: v.string(),
      count: v.number(),
    }),
  ),
  updatedAt: v.nullable(v.number()),
});

export const CommentParentEntitySchema = v.object({
  id: v.string(),
  content: v.string(),
  createdAt: v.number(),
});

export type CommentParentEntity = Infer<typeof CommentParentEntitySchema>;

export const CommentEntitySchema = v.object({
  id: v.string(),
  content: v.string(),
  author: AuthorEntitySchema,
  parent: v.nullable(
    v.object({
      id: v.string(),
      content: v.string(),
      createdAt: v.number(),
    }),
  ),
  media: v.array(MediaEntitySchema),
  stats: StatsEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type CommentEntity = Infer<typeof CommentEntitySchema>;

export const PostEntitySchema = v.object({
  id: v.string(),
  title: v.string(),
  content: v.string(),
  type: v.union(v.literal('blog'), v.literal('thread')),
  category: v.nullable(v.string()),
  author: AuthorEntitySchema,
  priority: v.number(),
  isDraft: v.boolean(),
  isPinned: v.boolean(),
  isLocked: v.boolean(),
  reactions: v.array(ReactionEntitySchema),
  comments: v.array(CommentEntitySchema),
  stats: StatsEntitySchema,
  media: v.array(MediaEntitySchema),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.nullable(v.number()),
});

export type PostEntity = Infer<typeof PostEntitySchema>;

export default defineSchema({
  users: defineTable(UserEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_email', ['email'])
    .index('by_auth_id', ['authId'])
    .index('by_alias', ['alias']),
  posts: defineTable(PostEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_type', ['type'])
    .index('by_category', ['category']),
});

export const IdSchema = v.object({
  id: v.string(),
});

export type IdArgs = Infer<typeof IdSchema>;

export const PostIdSchema = v.object({
  id: v.id('posts'),
});

export type PostIdArgs = Infer<typeof PostIdSchema>;

export type CreatePostArgs = Infer<typeof PostEntitySchema>;

export const UpdatePostSchema = v.object({
  id: v.id('posts'),
  updates: v.object({
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    priority: v.optional(v.number()),
    isDraft: v.optional(v.boolean()),
    isPinned: v.optional(v.boolean()),
    isLocked: v.optional(v.boolean()),
    reactions: v.optional(v.array(ReactionEntitySchema)),
    comments: v.optional(v.array(CommentEntitySchema)),
    stats: v.optional(StatsEntitySchema),
    media: v.optional(v.array(MediaEntitySchema)),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number()),
  }),
});

export type UpdatePostArgs = Infer<typeof UpdatePostSchema>;

export const UserIdSchema = v.object({
  id: v.id('users'),
});

export type UserIdArgs = Infer<typeof UserIdSchema>;

export const EmailSchema = v.object({
  email: v.string(),
});

export type EmailArgs = Infer<typeof EmailSchema>;

export const AuthIdSchema = v.object({
  authId: v.string(),
});

export type AuthIdArgs = Infer<typeof AuthIdSchema>;

export const AliasSchema = v.object({
  alias: v.string(),
});

export type AliasArgs = Infer<typeof AliasSchema>;

export type CreateUserArgs = Infer<typeof UserEntitySchema>;

export const UpdateUserSchema = v.object({
  id: v.id('users'),
  updates: v.object({
    authId: v.optional(v.string()),
    email: v.optional(v.string()),
    alias: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    bio: v.optional(v.string()),
    preferences: v.optional(
      v.array(
        v.object({
          interests: v.array(v.string()),
        }),
      ),
    ),
    role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
    isLocked: v.optional(v.boolean()),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number()),
  }),
});

export type UpdateUserArgs = Infer<typeof UpdateUserSchema>;

export const PostTypeSchema = v.object({
  type: v.union(v.literal('blog'), v.literal('thread')),
  paginationOpts: paginationOptsValidator,
});

export type PostTypeArgs = Infer<typeof PostTypeSchema>;
