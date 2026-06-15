import type {
  CommentEntity,
  Doc,
  ReactionEntity,
  ReplyEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const DeleteCommentReplyReactionParamsSchema = Type.Object({
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
  reactionId: Type.String({
    description: 'The id of the reaction',
    format: 'uuid',
  }),
});

export type DeleteCommentReplyReactionParamsSchema = Static<
  typeof DeleteCommentReplyReactionParamsSchema
>;

export type DeleteCommentReplyReactionRequest = {
  params: DeleteCommentReplyReactionParamsSchema;
  existing: ReactionEntity;
  comment: CommentEntity;
  reply: ReplyEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteCommentReplyReactionArgs = (
  request: DeleteCommentReplyReactionRequest,
): UpdateBlogArgs => {
  const { existing, blog, comment, reply } = request;

  const restReactions = reply.reactions.filter(
    (reaction) => reaction.id !== existing.id,
  );

  const updateReply = {
    ...reply,
    reactions: restReactions,
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

export class DeleteCommentReplyReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteCommentReplyReactionRequest) {
    super();
  }
}
