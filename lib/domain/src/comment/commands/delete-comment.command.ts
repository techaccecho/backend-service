import type { CommentEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../../blog/index.js';

export const DeleteCommentParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
});

export type DeleteCommentParamsSchema = Static<
  typeof DeleteCommentParamsSchema
>;

export type DeleteCommentRequest = {
  params: DeleteCommentParamsSchema;
  existing: CommentEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteCommentArgs = (
  request: DeleteCommentRequest,
): UpdateBlogArgs => {
  const { existing, blog } = request;
  const restComments = blog.comments.filter(
    (comment) => comment.id !== existing.id,
  );

  return {
    id: blog._id,
    updates: {
      comments: restComments,
      engagement: {
        ...blog.engagement,
        comments: restComments.length,
      },
    },
  };
};

export class DeleteCommentCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteCommentRequest) {
    super();
  }
}
