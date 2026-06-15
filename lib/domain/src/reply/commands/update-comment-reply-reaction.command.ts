import type {
  CommentEntity,
  Doc,
  ReactionEntity,
  ReplyEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const UpdateCommentReplyReactionParamsSchema = Type.Object({
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

export type UpdateCommentReplyReactionParams = Static<
  typeof UpdateCommentReplyReactionParamsSchema
>;

export const UpdateCommentReplyReactionSchema = Type.Object({
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type UpdateCommentReplyReaction = Static<typeof UpdateCommentReplyReactionSchema>;

export type UpdateCommentReplyReactionRequest = {
  params: UpdateCommentReplyReactionParams;
  update: UpdateCommentReplyReaction;
  existing: ReactionEntity;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  reply: ReplyEntity;
};

export const toUpdateCommentReplyReactionArgs = (
  request: UpdateCommentReplyReactionRequest,
): UpdateBlogArgs => {
  const { params, update, existing, blog, comment, reply } = request;
  const { reactionId } = params;

  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now(),
  };

  const restReactions = reply.reactions.filter(
    (reaction) => reaction.id !== reactionId,
  );

  const updateReply = {
    ...reply,
    reactions: [...restReactions, updateReaction],
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

export class UpdateCommentReplyReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateCommentReplyReactionRequest) {
    super();
  }
}
