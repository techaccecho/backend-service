import type { CommentEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const CreateCommentReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
});

export type CreateCommentReactionParams = Static<
  typeof CreateCommentReactionParamsSchema
>;

export const CreateCommentReactionSchema = Type.Object({
  userId: Type.String({ description: 'The id of the reactor' }),
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type CreateCommentReaction = Static<typeof CreateCommentReactionSchema>;

export type CreateCommentReactionRequest = {
  params: CreateCommentReactionParams;
  create: CreateCommentReaction;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  user: Doc<'users'>;
};

export const toCreateCommentReactionArgs = (
  request: CreateCommentReactionRequest,
): UpdateBlogArgs => {
  const { create, blog, comment, user } = request;

  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const createReaction = {
    id: uuid(),
    user: createUser,
    code: create.code,
    createdAt: now(),
    updatedAt: null,
  };

  const updateComment = {
    ...comment,
    reactions: [...comment.reactions, createReaction],
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

export class CreateCommentReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentReactionRequest) {
    super();
  }
}
