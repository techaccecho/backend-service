import type {
  CommentEntity,
  Doc,
  ReactionEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const UpdateCommentReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
  reactionId: Type.String({
    description: 'The id of the reaction',
    format: 'uuid',
  }),
});

export type UpdateCommentReactionParams = Static<
  typeof UpdateCommentReactionParamsSchema
>;

export const UpdateCommentReactionSchema = Type.Object({
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type UpdateCommentReaction = Static<typeof UpdateCommentReactionSchema>;

export type UpdateCommentReactionRequest = {
  params: UpdateCommentReactionParams;
  update: UpdateCommentReaction;
  existing: ReactionEntity;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
};

export const toUpdateCommentReactionArgs = (
  request: UpdateCommentReactionRequest,
): UpdateBlogArgs => {
  const { params, update, existing, blog, comment } = request;
  const { reactionId } = params;

  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now(),
  };

  const restReactions = comment.reactions.filter(
    (reaction) => reaction.id !== reactionId,
  );

  const updateComment = {
    ...comment,
    reactions: [...restReactions, updateReaction],
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

export class UpdateCommentReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateCommentReactionRequest) {
    super();
  }
}
