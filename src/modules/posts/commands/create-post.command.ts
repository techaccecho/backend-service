import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { CreatePostArgs, Doc } from '../../../../convex';
import type { PostData } from '../../../lib';

export const CreatePostSchema = Type.Object({
  title: Type.String({ description: 'The title of the post' }),
  content: Type.String({
    description: 'The actual content/description of the post',
  }),
  authorId: Type.String({ description: 'The id of the post author' }),
  type: Type.Union([Type.Literal('blog'), Type.Literal('thread')], {
    description:
      'The type of the post. Whether its a blog post or a thread topic',
  }),
  category: Type.Optional(
    Type.String({
      description: 'The category to which the post belongs to. E.g. Technology',
    }),
  ),
  priority: Type.Optional(
    Type.Number({
      description:
        'The priority to be given to the post. Helps with prioritizing posts',
    }),
  ),
  isDraft: Type.Optional(
    Type.Boolean({ description: 'Whether the post is pinned' }),
  ),
  isPinned: Type.Optional(
    Type.Boolean({ description: 'Whether the post is a draft' }),
  ),
  isLocked: Type.Optional(
    Type.Boolean({ description: 'Whether the post is locked' }),
  ),
  media: Type.Optional(
    Type.String({ description: 'The media referenced in the post' }),
  ),
});

export type CreatePost = Static<typeof CreatePostSchema>;

export const toCreatePostArgs = (
  request: CreatePost,
  postId: string,
  author: Doc<'users'>,
): CreatePostArgs => ({
  title: request.title,
  content: request.content,
  type: request.type,
  category: request.category ?? null,
  id: postId,
  author: {
    id: author.id,
    alias: author.alias,
    firstName: author.firstName,
    lastName: author.lastName,
  },
  priority: request.priority ?? 5,
  isDraft: request.isDraft ?? false,
  isPinned: request.isPinned ?? false,
  isLocked: request.isLocked ?? false,
  reactions: [],
  comments: [],
  stats: {
    viewsCount: 0,
    commentsCount: 0,
    reactions: [],
    updatedAt: null,
  },
  media: [],
  createdAt: Date.now(),
  updatedAt: null,
  lastActivityAt: null,
});

export class CreatePostCommand extends RequestData<PostData> {
  constructor(public readonly request: CreatePost) {
    super();
  }
}
