import type {
  CommentEntity,
  Doc,
  ReplyEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../../blog/index.js';

export const CreateCommentReplyViewerParamsSchema = Type.Object({
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

export type CreateCommentReplyViewerParams = Static<
  typeof CreateCommentReplyViewerParamsSchema
>;

export const CreateCommentReplyViewerSchema = Type.Object({
  userId: Type.String({ description: 'The id of the reply viewer' }),
});

export type CreateCommentReplyViewer = Static<
  typeof CreateCommentReplyViewerSchema
>;

export type CreateCommentReplyViewerRequest = {
  params: CreateCommentReplyViewerParams;
  create: CreateCommentReplyViewer;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  reply: ReplyEntity;
  user: Doc<'users'>;
};

export const toCreateCommentReplyViewerArgs = (
  request: CreateCommentReplyViewerRequest,
): UpdateBlogArgs => {
  const { blog, comment, reply, user } = request;

  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const updateViewers = [...reply.viewers, createViewer];

  const updateReply = {
    ...reply,
    viewers: updateViewers,
    engagement: {
      ...reply.engagement,
      views: updateViewers.length,
    },
  };

  const restReplies = comment.replies.filter(
    (existingReply) => existingReply.id !== reply.id,
  );

  const updateComment = {
    ...comment,
    replies: [...restReplies, updateReply],
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

export class CreateCommentReplyViewerCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentReplyViewerRequest) {
    super();
  }
}
