import type { CommentEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const CreateCommentReplyParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
});

export type CreateCommentReplyParams = Static<
  typeof CreateCommentReplyParamsSchema
>;

export const CreateCommentReplyAttachmentSchema = Type.Object({
  type: Type.Union([Type.Literal('media/image')], {
    description: 'Type of attachment',
  }),
  url: Type.Optional(Type.String({ description: 'URL of the attachment' })),
  content: Type.Optional(
    Type.String({
      description: 'Base64 encoded actual content of the attachment',
    }),
  ),
});

export const CreateCommentReplySchema = Type.Object({
  authorId: Type.String(),
  content: Type.String({
    description: 'The actual content',
  }),
  attachments: Type.Optional(
      Type.Array(CreateCommentReplyAttachmentSchema, {
        description: 'The attachments referenced',
      }),
    ),
});

export type CreateCommentReply = Static<typeof CreateCommentReplySchema>;

export type CreateCommentReplyRequest = {
  params: CreateCommentReplyParams;
  create: CreateCommentReply;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  user: Doc<'users'>;
};

export const toCreateCommentReplyArgs = (
  request: CreateCommentReplyRequest,
): UpdateBlogArgs => {
  const { create, blog, comment, user } = request;

  const createAuthor = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const createAttachments =
    create.attachments?.map((attachment) => ({
      id: uuid(),
      type: attachment.type,
      url: attachment.url ?? null,
      content: attachment.content ?? null,
      createdAt: now(),
      updatedAt: null,
    })) ?? [];

  const createEngagement = {
    views: 0,
    comments: 0,
    attachments: createAttachments.length,
    reactions: 0,
    updatedAt: null
  };

  const createReply = {
    id: uuid(),
    author: createAuthor,
    content: create.content,
    attachments: createAttachments,
    viewers: [],
    reactions: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null,
  };

  const updateReplies = [...comment.replies, createReply];

  const updateComment = {
    ...comment,
    replies: updateReplies,
    engagement: {
      ...comment.engagement,
      comments: updateReplies.length
    }
  };

  const restComments = blog.comments.filter(
    (existingComment) => existingComment.id !== comment.id,
  );

  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment],
    },
  };
};

export class CreateCommentReplyCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentReplyRequest) {
    super();
  }
}
