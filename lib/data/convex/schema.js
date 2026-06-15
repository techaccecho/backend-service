import { defineSchema, defineTable, paginationOptsValidator, } from 'convex/server';
import { v } from 'convex/values';
export const AttributeEntitySchema = v.object({
    id: v.string(),
    name: v.string(),
    value: v.string(),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const AttachmentEntitySchema = v.object({
    id: v.string(),
    type: v.union(v.literal('media/image')),
    url: v.nullable(v.string()),
    content: v.nullable(v.string()),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
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
export const UserPreviewEntitySchema = v.object({
    id: v.string(),
    email: v.string(),
    alias: v.nullable(v.string()),
    firstName: v.nullable(v.string()),
    lastName: v.nullable(v.string()),
});
export const EngagementEntitySchema = v.object({
    views: v.number(),
    comments: v.number(),
    attachments: v.number(),
    reactions: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const ReactionEntitySchema = v.object({
    id: v.string(),
    user: UserPreviewEntitySchema,
    code: v.string(),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const CommentParentEntitySchema = v.object({
    id: v.string(),
    content: v.string(),
    createdAt: v.number(),
});
export const ReplyEntitySchema = v.object({
    id: v.string(),
    user: UserPreviewEntitySchema,
    content: v.string(),
    attachments: v.array(AttachmentEntitySchema),
    viewers: v.array(UserPreviewEntitySchema),
    reactions: v.array(ReactionEntitySchema),
    engagement: EngagementEntitySchema,
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const CommentEntitySchema = v.object({
    id: v.string(),
    user: UserPreviewEntitySchema,
    content: v.string(),
    replies: v.array(ReplyEntitySchema),
    attachments: v.array(AttachmentEntitySchema),
    viewers: v.array(UserPreviewEntitySchema),
    reactions: v.array(ReactionEntitySchema),
    engagement: EngagementEntitySchema,
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const BlogEntitySchema = v.object({
    id: v.string(),
    user: UserPreviewEntitySchema,
    type: v.union(v.literal('post'), v.literal('topic')),
    tags: v.array(AttributeEntitySchema),
    title: v.string(),
    content: v.string(),
    priority: v.number(),
    isDraft: v.boolean(),
    isPinned: v.boolean(),
    isLocked: v.boolean(),
    comments: v.array(CommentEntitySchema),
    attachments: v.array(AttachmentEntitySchema),
    viewers: v.array(UserPreviewEntitySchema),
    reactions: v.array(ReactionEntitySchema),
    engagement: EngagementEntitySchema,
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
    lastActivityAt: v.number(),
});
export const ApiConfigEntitySchema = v.object({
    auth: v.object({
        jkwsUri: v.string(),
        audience: v.string(),
        issuer: v.string(),
    }),
});
export const ApiFeatureEntitySchema = v.object({
    id: v.string(),
    name: v.string(),
    enabled: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export const ApiSubscriberEntitySchema = v.object({
    id: v.string(),
    name: v.string(),
    type: v.union(v.literal('api-key')),
    value: v.string(),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
    lastActivityAt: v.number(),
});
export const ApiEntitySchema = v.object({
    id: v.string(),
    name: v.string(),
    config: ApiConfigEntitySchema,
    features: v.array(ApiFeatureEntitySchema),
    subscribers: v.array(ApiSubscriberEntitySchema),
    createdAt: v.number(),
    updatedAt: v.nullable(v.number()),
});
export default defineSchema({
    users: defineTable(UserEntitySchema)
        .index('by_public_id', ['id'])
        .index('by_email', ['email'])
        .index('by_auth_id', ['authId'])
        .index('by_alias', ['alias']),
    blogs: defineTable(BlogEntitySchema)
        .index('by_public_id', ['id'])
        .index('by_type', ['type'])
        .index('by_last_activity', ['lastActivityAt']),
    apis: defineTable(ApiEntitySchema)
        .index('by_public_id', ['id'])
        .index('by_name', ['name']),
});
export const IdSchema = v.object({
    id: v.string(),
});
export const BlogIdSchema = v.object({
    id: v.id('blogs'),
});
export const UpdateBlogSchema = v.object({
    id: v.id('blogs'),
    updates: v.object({
        type: v.optional(v.union(v.literal('post'), v.literal('topic'))),
        tags: v.optional(v.array(AttributeEntitySchema)),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        priority: v.optional(v.number()),
        isDraft: v.optional(v.boolean()),
        isPinned: v.optional(v.boolean()),
        isLocked: v.optional(v.boolean()),
        comments: v.optional(v.array(CommentEntitySchema)),
        reactions: v.optional(v.array(ReactionEntitySchema)),
        attachments: v.optional(v.array(AttachmentEntitySchema)),
        viewers: v.optional(v.array(UserPreviewEntitySchema)),
        engagement: v.optional(EngagementEntitySchema),
        updatedAt: v.optional(v.number()),
        lastActivityAt: v.optional(v.number()),
    }),
});
export const UserIdSchema = v.object({
    id: v.id('users'),
});
export const EmailSchema = v.object({
    email: v.string(),
});
export const AuthIdSchema = v.object({
    authId: v.string(),
});
export const AliasSchema = v.object({
    alias: v.string(),
});
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
        updatedAt: v.optional(v.number()),
        lastActivityAt: v.optional(v.number()),
    }),
});
export const BlogTypeSchema = v.object({
    type: v.union(v.literal('post'), v.literal('topic')),
    paginationOpts: paginationOptsValidator,
});
export const ApiIdSchema = v.object({
    id: v.id('apis'),
});
export const ApiNameSchema = v.object({
    name: v.string(),
});
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
