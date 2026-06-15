import type {
  CommentEntity,
  Doc,
  ReactionEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const DeleteCommentReactionParamsSchema = Type.Object({
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

export type DeleteCommentReactionParamsSchema = Static<
  typeof DeleteCommentReactionParamsSchema
>;

export type DeleteCommentReactionRequest = {
  params: DeleteCommentReactionParamsSchema;
  existing: ReactionEntity;
  comment: CommentEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteCommentReactionArgs = (
  request: DeleteCommentReactionRequest,
): UpdateBlogArgs => {
  const { existing, blog, comment } = request;
  const restReactions = comment.reactions.filter(
    (reaction) => reaction.id !== existing.id,
  );

  const updateComment = {
    ...comment,
    reactions: restReactions,
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

export class DeleteCommentReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteCommentReactionRequest) {
    super();
  }
}
