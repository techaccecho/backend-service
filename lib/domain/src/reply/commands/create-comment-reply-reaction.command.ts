import type { CommentEntity, Doc, ReplyEntity, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const CreateCommentReplyReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
  replyId: Type.String({
    description: 'The id of the reply',
    format: 'uuid',
  }),
});

export type CreateCommentReplyReactionParams = Static<
  typeof CreateCommentReplyReactionParamsSchema
>;

export const CreateCommentReplyReactionSchema = Type.Object({
  userId: Type.String({ description: 'The id of the reactor' }),
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type CreateCommentReplyReaction = Static<typeof CreateCommentReplyReactionSchema>;

export type CreateCommentReplyReactionRequest = {
  params: CreateCommentReplyReactionParams;
  create: CreateCommentReplyReaction;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  reply: ReplyEntity;
  user: Doc<'users'>;
};

export const toCreateCommentReplyReactionArgs = (
  request: CreateCommentReplyReactionRequest,
): UpdateBlogArgs => {
  const { create, blog, comment, reply, user } = request;

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

  const updateCommentReply = {
    ...reply,
    reactions: [...reply.reactions, createReaction],
  };

  const restReplies = comment.replies.filter(
    (existingReply) => existingReply.id !== reply.id,
  );

  const updateReplies = [...restReplies, updateCommentReply];

  const updateComment = {
    ...comment,
    replies: updateReplies,
    engagement: {
      ...comment.engagement,
      comments: updateReplies.length,
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

export class CreateCommentReplyReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentReplyReactionRequest) {
    super();
  }
}
