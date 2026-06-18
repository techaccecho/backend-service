import type { Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const CreateCommentParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type CreateCommentParams = Static<typeof CreateCommentParamsSchema>;

export const CreateAttachmentSchema = Type.Object({
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

export const CreateCommentSchema = Type.Object({
  authorId: Type.String({ description: 'The id of the author' }),
  content: Type.String({
    description: 'The content',
  }),
  attachments: Type.Optional(
    Type.Array(CreateAttachmentSchema, {
      description: 'The attachments referenced',
    }),
  ),
});

export type CreateComment = Static<typeof CreateCommentSchema>;

export type CreateCommentRequest = {
  params: CreateCommentParams;
  create: CreateComment;
  existing: Doc<'blogs'>;
  user: Doc<'users'>;
};

export const toCreateCommentArgs = (
  request: CreateCommentRequest,
): UpdateBlogArgs => {
  const { create, existing, user } = request;

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
    updatedAt: null,
  };

  const createComment = {
    id: uuid(),
    author: createAuthor,
    content: create.content,
    replies: [],
    attachments: createAttachments,
    viewers: [],
    reactions: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null,
  };

  const updateComments = [...existing.comments, createComment];

  return {
    id: existing._id,
    updates: {
      comments: updateComments,
      engagement: {
        ...existing.engagement,
        comments: updateComments.length
      },
    },
  };
};

export class CreateCommentCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentRequest) {
    super();
  }
}
