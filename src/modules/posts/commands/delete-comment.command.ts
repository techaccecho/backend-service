import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { Id } from '../../../../convex/_generated/dataModel';
import type { CommentEntity, UpdatePostArgs } from '../../../../convex/schema';
import type { PostData } from '../../../lib';

export const DeleteCommentParamSchema = Type.Object({
  id: Type.String({
    description: 'The id of the post of the comment to remove',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment to remove',
    format: 'uuid',
  }),
});

export type DeleteCommentParam = Static<typeof DeleteCommentParamSchema>;

export const toDeleteComment = (
  rest: CommentEntity[],
  postId: Id<'posts'>,
): UpdatePostArgs => {
  return {
    id: postId,
    updates: {
      comments: rest,
    },
  };
};

export class DeleteCommentCommand extends RequestData<PostData> {
  constructor(public readonly request: DeleteCommentParam) {
    super();
  }
}
