import type { Id } from '@backend-service/convex';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type {
  CommentEntity,
  UpdatePostArgs,
} from '../../../../../../libs/convex/schema';
import type { PostData } from '../../../lib';

export const UpdateCommentParamSchema = Type.Object({
  id: Type.String({
    description: 'The id of the post of the comment to update',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment to update',
    format: 'uuid',
  }),
});

export type UpdateCommentParam = Static<typeof UpdateCommentParamSchema>;

export const UpdateCommentSchema = Type.Partial(
  Type.Object({
    content: Type.String({
      description: 'The actual content/description of the comment',
    }),
    media: Type.Optional(
      Type.String({ description: 'The media referenced in the comment' }),
    ),
  }),
);

export type UpdateComment = Static<typeof UpdateCommentSchema>;

export const toUpdateComment = (
  request: UpdateComment,
  toUpdate: CommentEntity,
  rest: CommentEntity[],
  postId: Id<'posts'>,
): UpdatePostArgs => {
  const update = {
    ...toUpdate,
    ...request,
    media: [],
  };

  return {
    id: postId,
    updates: {
      comments: [...rest, { ...update }],
    },
  };
};

export class UpdateCommentCommand extends RequestData<PostData> {
  constructor(
    public readonly param: UpdateCommentParam,
    public readonly request: UpdateComment,
  ) {
    super();
  }
}
