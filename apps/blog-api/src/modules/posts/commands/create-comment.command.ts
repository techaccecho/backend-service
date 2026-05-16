import type { Doc } from '@backend-service/convex';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type {
  CommentParentEntity,
  UpdatePostArgs,
} from '../../../../../../libs/convex/schema';
import { IdParamSchema, type PostData } from '../../../lib';

export const CreateCommentParamSchema = IdParamSchema(
  'The id of the post of the comment to create',
);

export type CreateCommentParam = Static<typeof CreateCommentParamSchema>;

export const CreateCommentSchema = Type.Object({
  content: Type.String({
    description: 'The actual content/description of the comment',
  }),
  authorId: Type.String({ description: 'The id of the comment author' }),
  parentId: Type.Optional(
    Type.String({
      description:
        'The id of the comment parent. Used when a comment is a reply',
    }),
  ),
  media: Type.Optional(
    Type.String({ description: 'The media referenced in the comment' }),
  ),
});

export type CreateComment = Static<typeof CreateCommentSchema>;

export const toCreateCommentArgs = (
  request: CreateComment,
  commentId: string,
  post: Doc<'posts'>,
  author: Doc<'users'>,
  parent?: CommentParentEntity,
): UpdatePostArgs => {
  return {
    id: post._id,
    updates: {
      comments: [
        ...post.comments,
        {
          id: commentId,
          content: request.content,
          author: {
            id: author.id,
            alias: author.alias,
            firstName: author.firstName,
            lastName: author.lastName,
          },
          parent: parent ?? null,
          stats: {
            viewsCount: 0,
            commentsCount: 0,
            reactions: [],
            updatedAt: null,
          },
          media: [],
          createdAt: Date.now(),
          updatedAt: null,
        },
      ],
    },
  };
};

export class CreateCommentCommand extends RequestData<PostData> {
  constructor(
    public readonly param: CreateCommentParam,
    public readonly request: CreateComment,
  ) {
    super();
  }
}
