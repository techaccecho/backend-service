import type {
  CommentEntity,
  Doc,
  EngagementEntity,
  ReactionEntity,
  ReplyEntity,
  UserPreviewEntity,
} from '@lib/data';
import { DataSchema, PaginatedDataSchema, toISO } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { toAttribute, AttributeSchema, toAttachment, AttachmentSchema } from '../util/index.js';

export const UserPreviewSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  email: Type.String({ format: 'email' }),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
});

export type UserPreview = Static<typeof UserPreviewSchema>;

export const EngagementSchema = Type.Object({
  views: Type.Number(),
  comments: Type.Number(),
  attachments: Type.Number(),
  reactions: Type.Number(),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Engagement = Static<typeof EngagementSchema>;

export const ReactionSchema = Type.Object({
  user: UserPreviewSchema,
  code: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Reaction = Static<typeof ReactionSchema>;

export const ReplySchema = Type.Object({
  user: UserPreviewSchema,
  content: Type.Union([Type.String(), Type.Null()]),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Reply = Static<typeof ReplySchema>;

export const CommentSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  user: UserPreviewSchema,
  content: Type.String(),
  replies: Type.Array(ReplySchema),
  attachments: Type.Array(AttachmentSchema),
  viewers: Type.Array(UserPreviewSchema),
  reactions: Type.Array(ReactionSchema),
  engagement: EngagementSchema,
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Comment = Static<typeof CommentSchema>;

export const BlogSchema = Type.Object({
  _id: Type.String(),
  id: Type.String({ format: 'uuid' }),
  user: UserPreviewSchema,
  title: Type.String(),
  content: Type.String(),
  type: Type.Union([Type.Literal('post'), Type.Literal('topic')]),
  tags: Type.Array(AttributeSchema),
  priority: Type.Number(),
  isDraft: Type.Boolean(),
  isPinned: Type.Boolean(),
  isLocked: Type.Boolean(),
  comments: Type.Array(CommentSchema),
  attachments: Type.Array(AttachmentSchema),
  viewers: Type.Array(UserPreviewSchema),
  reactions: Type.Array(ReactionSchema),
  engagement: EngagementSchema,
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
  lastActivityAt: Type.String({ format: 'date-time' }),
});

export type Blog = Static<typeof BlogSchema>;

export const BlogDataSchema = DataSchema(BlogSchema);

export type BlogData = Static<typeof BlogDataSchema>;

export const PaginatedBlogDataSchema = PaginatedDataSchema(BlogSchema);

export type PaginatedBlogData = Static<typeof PaginatedBlogDataSchema>;

export const toUserPreviewEntity = (
  request: Doc<'users'>,
): UserPreviewEntity => ({
  id: request.id,
  email: request.email,
  alias: request.alias,
  firstName: request.firstName,
  lastName: request.lastName,
});

export const toReply = (request: ReplyEntity): Reply => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});

export const toReaction = (request: ReactionEntity): Reaction => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});

export const toEngagement = (request: EngagementEntity): Engagement => ({
  ...request,
  updatedAt: toISO(request.updatedAt),
});

export const toComment = (request: CommentEntity): Comment => ({
  ...request,
  replies: request.replies.map(toReply),
  attachments: request.attachments.map(toAttachment),
  reactions: request.reactions.map(toReaction),
  engagement: toEngagement(request.engagement),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});

export const toBlog = (request: Doc<'blogs'>): Blog => ({
  ...request,
  tags: request.tags.map(toAttribute),
  comments: request.comments.map(toComment),
  attachments: request.attachments.map(toAttachment),
  reactions: request.reactions.map(toReaction),
  engagement: toEngagement(request.engagement),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt),
});

export const assertBlog: (blog?: Blog | null) => asserts blog is Blog = (
  blog,
) => {
  if (blog == null) {
    throw new Error('blog is null/undefined');
  }
};
