import { type Static, Type } from '@sinclair/typebox';
import { DataSchema, PaginatedDataSchema } from './data.schema';

export const AuthorSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  alias: Type.Union([Type.String(), Type.Null()]),
  firstName: Type.Union([Type.String(), Type.Null()]),
  lastName: Type.Union([Type.String(), Type.Null()]),
});

export type Author = Static<typeof AuthorSchema>;

export const StatsSchema = Type.Object({
  viewsCount: Type.Number(),
  commentsCount: Type.Number(),
  reactions: Type.Array(
    Type.Object({
      type: Type.String(),
      count: Type.Number(),
    }),
  ),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Stats = Static<typeof StatsSchema>;

export const ReactionSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  type: Type.String(),
});

export type Reaction = Static<typeof ReactionSchema>;

export const CommentParentSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  content: Type.String(),
});

export type CommentParent = Static<typeof ReactionSchema>;

export const MediaSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  type: Type.Union([Type.Literal('image')]),
  url: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
});

export type Media = Static<typeof MediaSchema>;

export const CommentSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  content: Type.String(),
  author: AuthorSchema,
  parent: Type.Union([CommentParentSchema, Type.Null()]),
  media: Type.Array(MediaSchema),
  stats: StatsSchema,
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Comment = Static<typeof CommentSchema>;

export const PostSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  title: Type.String(),
  content: Type.String(),
  author: AuthorSchema,
  type: Type.Union([Type.Literal('blog'), Type.Literal('thread')]),
  category: Type.Union([Type.String(), Type.Null()]),
  priority: Type.Number(),
  isDraft: Type.Boolean(),
  isPinned: Type.Boolean(),
  isLocked: Type.Boolean(),
  reactions: Type.Array(ReactionSchema),
  comments: Type.Array(CommentSchema),
  stats: StatsSchema,
  media: Type.Array(MediaSchema),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
  lastActivityAt: Type.Union([
    Type.String({ format: 'date-time' }),
    Type.Null(),
  ]),
});

export type Post = Static<typeof PostSchema>;

export const PostDataSchema = DataSchema(PostSchema);

export type PostData = Static<typeof PostDataSchema>;

export const PaginatedPostDataSchema = PaginatedDataSchema(PostSchema);


export type PaginatedPostData = Static<typeof PaginatedPostDataSchema>;
