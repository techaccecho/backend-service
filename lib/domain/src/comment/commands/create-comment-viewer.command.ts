import type { CommentEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../../blog/index.js';

export const CreateCommentViewerParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
});

export type CreateCommentViewerParams = Static<
  typeof CreateCommentViewerParamsSchema
>;

export const CreateCommentViewerSchema = Type.Object({
  userId: Type.String({ description: 'The id of the blog viewer' }),
});

export type CreateCommentViewer = Static<typeof CreateCommentViewerSchema>;

export type CreateCommentViewerRequest = {
  params: CreateCommentViewerParams;
  create: CreateCommentViewer;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
  user: Doc<'users'>;
};

export const toCreateCommentViewerArgs = (
  request: CreateCommentViewerRequest,
): UpdateBlogArgs => {
  const { blog, comment, user } = request;

  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const updateViewers = [...comment.viewers, createViewer];

  const updateComment = {
    ...comment,
    viewers: updateViewers,
    engagement: {
      ...comment.engagement,
      views: updateViewers.length,
    },
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

export class CreateCommentViewerCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateCommentViewerRequest) {
    super();
  }
}
