import {
  defineSchema,
  defineTable,
  paginationOptsValidator,
} from 'convex/server';
import { type Infer, v } from 'convex/values';

export const AttributeEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  value: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type AttributeEntity = Infer<typeof AttributeEntitySchema>;

export const AttachmentEntitySchema = v.object({
  id: v.string(),
  type: v.union(v.literal('media/image')),
  url: v.nullable(v.string()),
  content: v.nullable(v.string()),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type AttachmentEntity = Infer<typeof AttachmentEntitySchema>;

export const UserEntitySchema = v.object({
  id: v.string(),
  authId: v.string(),
  email: v.string(),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string()),
  dateOfBirth: v.nullable(v.string()),
  bio: v.nullable(v.string()),
  preferences: v.array(AttributeEntitySchema),
  role: v.union(v.literal('user'), v.literal('admin')),
  isLocked: v.boolean(),
  avatar: v.nullable(AttachmentEntitySchema),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number(),
});

export type UserEntity = Infer<typeof UserEntitySchema>;

export const UserPreviewEntitySchema = v.object({
  id: v.string(),
  email: v.string(),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string()),
});

export type UserPreviewEntity = Infer<typeof UserPreviewEntitySchema>;

export const EngagementEntitySchema = v.object({
  views: v.number(),
  comments: v.number(),
  attachments: v.number(),
  reactions: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type EngagementEntity = Infer<typeof EngagementEntitySchema>;

export const ReactionEntitySchema = v.object({
  id: v.string(),
  user: UserPreviewEntitySchema,
  code: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type ReactionEntity = Infer<typeof ReactionEntitySchema>;

export const CommentParentEntitySchema = v.object({
  id: v.string(),
  content: v.string(),
  createdAt: v.number(),
});

export type CommentParentEntity = Infer<typeof CommentParentEntitySchema>;

export const ReplyEntitySchema = v.object({
  id: v.string(),
  author: UserPreviewEntitySchema,
  content: v.string(),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type ReplyEntity = Infer<typeof ReplyEntitySchema>;

export const CommentEntitySchema = v.object({
  id: v.string(),
  author: UserPreviewEntitySchema,
  content: v.string(),
  replies: v.array(ReplyEntitySchema),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type CommentEntity = Infer<typeof CommentEntitySchema>;

export const BlogEntitySchema = v.object({
  id: v.string(),
  author: UserPreviewEntitySchema,
  type: v.union(v.literal('post'), v.literal('thread'), v.literal('none')),
  tags: v.array(AttributeEntitySchema),
  title: v.string(),
  content: v.string(),
  priority: v.number(),
  isDraft: v.boolean(),
  isPinned: v.boolean(),
  isLocked: v.boolean(),
  participants: v.array(UserPreviewEntitySchema),
  comments: v.array(CommentEntitySchema),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  deletedAt: v.optional(v.nullable(v.number())),
  lastActivityAt: v.number(),
  searchableText: v.optional(v.string()),
});

export type BlogEntity = Infer<typeof BlogEntitySchema>;

export const AdminBlogActionEntitySchema = v.object({
  id: v.string(),
  blogId: v.string(),
  blog: BlogEntitySchema,
  adminId: v.string(),
  adminAlias: v.nullable(v.string()),
  action: v.union(v.literal('soft_delete'), v.literal('hard_delete')),
  reason: v.string(),
  createdAt: v.number(),
});

export type AdminBlogActionEntity = Infer<typeof AdminBlogActionEntitySchema>;

export const ApiConfigEntitySchema = v.object({
  auth: v.object({
    jkwsUri: v.string(),
    audience: v.string(),
    issuer: v.string(),
  }),
});

export type ApiConfigEntity = Infer<typeof ApiConfigEntitySchema>;

export const ApiFeatureEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  enabled: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type ApiFeatureEntity = Infer<typeof ApiFeatureEntitySchema>;

export const ApiSubscriberEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  type: v.union(v.literal('api-key')),
  value: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number(),
});

export type ApiSubscriberEntity = Infer<typeof ApiSubscriberEntitySchema>;

export const ApiEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  config: ApiConfigEntitySchema,
  features: v.array(ApiFeatureEntitySchema),
  subscribers: v.array(ApiSubscriberEntitySchema),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type ApiEntity = Infer<typeof BlogEntitySchema>;

export const FaqEntitySchema = v.object({
  id: v.string(),
  type: v.string(),
  version: v.number(),
  title: v.string(),
  description: v.string(),
  sortOrder: v.number(),
  question: v.string(),
  answer: v.string(),
  tags: v.array(v.string()),
  isActive: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
});

export type FaqEntity = Infer<typeof FaqEntitySchema>;

export const WordSearchCellSchema = v.object({
  x: v.number(),
  y: v.number(),
});

export const FoundWordSchema = v.object({
  word: v.string(),
  cells: v.array(WordSearchCellSchema),
});

export const ClueEntitySchema = v.object({
  word: v.string(),
  question: v.string(),
});

export const PuzzleEntitySchema = v.object({
  id: v.string(),
  userId: v.string(),
  words: v.array(v.string()),
  clues: v.array(ClueEntitySchema),
  grid: v.array(v.array(v.string())),
  size: v.number(),
  foundWords: v.array(FoundWordSchema),
  completed: v.boolean(),
  shortUrl: v.optional(v.string()),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.nullable(v.number())),
});

export type PuzzleEntity = Infer<typeof PuzzleEntitySchema>;

export const ShortUrlEntitySchema = v.object({
  shortCode: v.string(),
  redirectUrl: v.string(),
  userId: v.string(),
  createdAt: v.optional(v.number()),
  expiresAt: v.optional(v.number()),
});

export type ShortUrlEntity = Infer<typeof ShortUrlEntitySchema>;

export const DictionaryEntitySchema = v.object({
  id: v.string(),
  word: v.string(),
  question: v.string(),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.nullable(v.number())),
});

export type DictionaryEntity = Infer<typeof DictionaryEntitySchema>;

export const RedirectUrlEntitySchema = v.object({
  type: v.string(),
  redirectUrl: v.string(),
  serviceName: v.optional(v.nullable(v.string())),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.nullable(v.number())),
});

export type RedirectUrlEntity = Infer<typeof RedirectUrlEntitySchema>;

export const ServiceMappingEntitySchema = v.object({
  serviceName: v.string(),
  redirectUrlType: v.string(),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.nullable(v.number())),
});

export type ServiceMappingEntity = Infer<typeof ServiceMappingEntitySchema>;

export default defineSchema({
  users: defineTable(UserEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_email', ['email'])
    .index('by_auth_id', ['authId'])
    .index('by_alias', ['alias']),
  blogs: defineTable(BlogEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_type', ['type'])
    .index('by_last_activity', ['lastActivityAt'])
    .index('by_type_last_activity', ['type', 'lastActivityAt'])
    .searchIndex('search_text', {
      searchField: 'searchableText',
      filterFields: ['type'],
    }),
  adminBlogActions: defineTable(AdminBlogActionEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_blog_id', ['blogId'])
    .index('by_admin_id', ['adminId']),
  apis: defineTable(ApiEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_name', ['name']),
  faqs: defineTable(FaqEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_type_active', ['type', 'isActive']),
  puzzles: defineTable(PuzzleEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_user_id', ['userId']),
  shortUrls: defineTable(ShortUrlEntitySchema)
    .index('by_short_code', ['shortCode'])
    .index('by_user_id', ['userId']),
  dictionary: defineTable(DictionaryEntitySchema)
    .index('by_public_id', ['id'])
    .index('by_word', ['word']),
  redirectUrls: defineTable(RedirectUrlEntitySchema).index('by_type', ['type']),
  serviceMappings: defineTable(ServiceMappingEntitySchema).index(
    'by_service_name',
    ['serviceName'],
  ),
});

export const IdSchema = v.object({
  id: v.string(),
});

export type IdArgs = Infer<typeof IdSchema>;

export const BlogIdSchema = v.object({
  id: v.id('blogs'),
});

export type BlogIdArgs = Infer<typeof BlogIdSchema>;

export type CreateBlogArgs = Infer<typeof BlogEntitySchema>;

export const UpdateBlogSchema = v.object({
  id: v.id('blogs'),
  updates: v.object({
    type: v.optional(
      v.union(v.literal('post'), v.literal('thread'), v.literal('none')),
    ),
    tags: v.optional(v.array(AttributeEntitySchema)),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    priority: v.optional(v.number()),
    isDraft: v.optional(v.boolean()),
    isPinned: v.optional(v.boolean()),
    isLocked: v.optional(v.boolean()),
    participants: v.optional(v.array(UserPreviewEntitySchema)),
    comments: v.optional(v.array(CommentEntitySchema)),
    reactions: v.optional(v.array(ReactionEntitySchema)),
    attachments: v.optional(v.array(AttachmentEntitySchema)),
    viewers: v.optional(v.array(UserPreviewEntitySchema)),
    engagement: v.optional(EngagementEntitySchema),
    updatedAt: v.optional(v.number()),
    deletedAt: v.optional(v.nullable(v.number())),
    lastActivityAt: v.optional(v.number()),
    searchableText: v.optional(v.string()),
  }),
});

export type UpdateBlogArgs = Infer<typeof UpdateBlogSchema>;

export type CreateAdminBlogActionArgs = Infer<
  typeof AdminBlogActionEntitySchema
>;

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
    alias: v.optional(v.nullable(v.string())),
    firstName: v.optional(v.nullable(v.string())),
    lastName: v.optional(v.nullable(v.string())),
    dateOfBirth: v.optional(v.nullable(v.string())),
    bio: v.optional(v.nullable(v.string())),
    preferences: v.optional(v.array(AttributeEntitySchema)),
    role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
    isLocked: v.optional(v.boolean()),
    avatar: v.optional(AttachmentEntitySchema),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number()),
  }),
});

export type UpdateUserArgs = Infer<typeof UpdateUserSchema>;

export const BlogTypeSchema = v.object({
  type: v.union(v.literal('post'), v.literal('thread'), v.literal('none')),
  paginationOpts: paginationOptsValidator,
  sort: v.optional(v.union(v.literal('asc'), v.literal('desc'))),
  userId: v.optional(v.string()),
  role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
  search: v.optional(v.string()),
  authorId: v.optional(v.string()),
});

export type BlogTypeArgs = Infer<typeof BlogTypeSchema>;

export const BlogListSchema = v.object({
  paginationOpts: paginationOptsValidator,
  userId: v.optional(v.string()),
  role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
});

export type BlogListArgs = Infer<typeof BlogListSchema>;

export const ApiIdSchema = v.object({
  id: v.id('apis'),
});

export type ApiIdArgs = Infer<typeof ApiIdSchema>;

export const ApiNameSchema = v.object({
  name: v.string(),
});

export type ApiNameArgs = Infer<typeof ApiNameSchema>;

export type CreateApiArgs = Infer<typeof ApiEntitySchema>;

export type CreateFaqArgs = Infer<typeof FaqEntitySchema>;

export const UpdateApiSchema = v.object({
  id: v.id('apis'),
  updates: v.object({
    name: v.optional(v.string()),
    config: v.optional(ApiConfigEntitySchema),
    features: v.optional(v.array(ApiFeatureEntitySchema)),
    subscribers: v.optional(v.array(ApiSubscriberEntitySchema)),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number()),
  }),
});

export type UpdateApiArgs = Infer<typeof UpdateApiSchema>;
