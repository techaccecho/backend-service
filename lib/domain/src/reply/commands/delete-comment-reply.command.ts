import type {
  CommentEntity,
  Doc,
  ReplyEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const DeleteCommentReplyParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
  replyId: Type.String({
    description: 'The id of the reaction',
    format: 'uuid',
  }),
});

export type DeleteCommentReplyParamsSchema = Static<
  typeof DeleteCommentReplyParamsSchema
>;

export type DeleteCommentReplyRequest = {
  params: DeleteCommentReplyParamsSchema;
  existing: ReplyEntity;
  comment: CommentEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteCommentReplyArgs = (
  request: DeleteCommentReplyRequest,
): UpdateBlogArgs => {
  const { existing, blog, comment } = request;
  const restReplies = comment.replies.filter(
    (reply) => reply.id !== existing.id,
  );

  const updateComment = {
    ...comment,
    replies: restReplies,
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

export class DeleteCommentReplyCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteCommentReplyRequest) {
    super();
  }
}
