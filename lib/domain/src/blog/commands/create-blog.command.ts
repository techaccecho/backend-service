import type { CreateBlogArgs, Doc } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

const CreateAttachmentSchema = Type.Object({
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

export const CreateBlogSchema = Type.Object({
  title: Type.String({ description: 'The title of the blog' }),
  content: Type.String({
    description: 'The actual content/description of the blog',
  }),
  authorId: Type.String({ description: 'The id of the blog writer' }),
  type: Type.Union(
    [Type.Literal('post'), Type.Literal('thread'), Type.Literal('none')],
    {
      description: 'The type of the blog. Whether its a blog post or a topic',
    },
  ),
  tags: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String({ description: 'Tag name' }),
        value: Type.String({ description: 'Tag value' }),
      }),
      {
        description: 'The tags for blog e.g. Category: Technology',
      },
    ),
  ),
  priority: Type.Optional(
    Type.Number({
      description:
        'The priority to be given to the blog. Helps with prioritizing blogs',
    }),
  ),
  isDraft: Type.Optional(
    Type.Boolean({ description: 'Whether the blog is draft' }),
  ),
  isPinned: Type.Optional(
    Type.Boolean({ description: 'Whether the blog is pinned' }),
  ),
  isLocked: Type.Optional(
    Type.Boolean({ description: 'Whether the blog is locked' }),
  ),
  attachments: Type.Optional(
    Type.Array(CreateAttachmentSchema, {
      description: 'The attachments referenced',
    }),
  ),
});

export type CreateBlog = Static<typeof CreateBlogSchema>;

export type CreateBlogRequest = {
  create: CreateBlog;
  user: Doc<'users'>;
};

export const toCreateBlogArgs = (
  request: CreateBlogRequest,
): CreateBlogArgs => {
  const { create, user } = request;

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

  return {
    id: uuid(),
    title: create.title,
    content: create.content,
    author: createAuthor,
    type: create.type,
    tags: [],
    priority: create.priority ?? 5,
    isDraft: create.isDraft ?? false,
    isPinned: create.isPinned ?? false,
    isLocked: create.isLocked ?? false,
    attachments: createAttachments,
    participants: [],
    comments: [],
    viewers: [],
    reactions: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now(),
  };
};

export class CreateBlogCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateBlogRequest) {
    super();
  }
}
