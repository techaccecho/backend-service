import type {
  AttachmentEntity,
  CommentEntity,
  Doc,
  UpdateBlogArgs,
} from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const UpdateCommentParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  commentId: Type.String({
    description: 'The id of the comment',
    format: 'uuid',
  }),
});

export type UpdateCommentParams = Static<typeof UpdateCommentParamsSchema>;

export const UpdateAttachmentSchema = Type.Partial(
  Type.Object({
    id: Type.String({
      format: 'uuid',
      description: 'The id of the attachment',
    }),
    type: Type.Union([Type.Literal('media/image')], {
      description: 'Type of attachment',
    }),
    url: Type.Optional(Type.String({ description: 'URL of the attachment' })),
    content: Type.Optional(
      Type.String({
        description: 'Base64 encoded actual content of the attachment',
      }),
    ),
  }),
);

export type UpdateAttachment = Static<typeof UpdateAttachmentSchema>;

export const UpdateCommentSchema = Type.Partial(
  Type.Object({
    content: Type.String({
      description: 'The content',
    }),
    attachments: Type.Array(UpdateAttachmentSchema, {
      description: 'The attachments referenced',
    }),
  }),
);

export type UpdateComment = Static<typeof UpdateCommentSchema>;

export type UpdateCommentRequest = {
  params: UpdateCommentParams;
  update: UpdateComment;
  existing: CommentEntity;
  blog: Doc<'blogs'>;
};

export const toUpdateCommentArgs = (
  request: UpdateCommentRequest,
): UpdateBlogArgs => {
  const { params, update, existing, blog } = request;
  const { commentId } = params;

  const updateAttachments =
    update.attachments?.reduce((acc, curr) => {
      const existingAttachment = existing.attachments.find(
        (existingAttachment) => existingAttachment.id === curr.id,
      );

      if (existingAttachment != null) {
        acc.push({
          ...existingAttachment,
          type: curr.type ?? existingAttachment.type,
          url: curr.url ?? existingAttachment.url,
          content: curr.content ?? existingAttachment.content,
          updatedAt: now(),
        });
      }

      if (
        existingAttachment == null &&
        curr.type != null &&
        (curr.url != null || curr.content != null)
      ) {
        acc.push({
          id: uuid(),
          type: curr.type,
          url: curr.url ?? null,
          content: curr.content ?? null,
          createdAt: now(),
          updatedAt: null,
        });
      }

      return acc;
    }, [] as AttachmentEntity[]) ?? [];

  const restAttachments = existing.attachments.filter(
    (existingAttachment) =>
      !updateAttachments.some(
        (attachment) => attachment.id === existingAttachment.id,
      ),
  );

  const updateComment = {
    ...existing,
    content: update.content ?? existing.content,
    attachments: [...restAttachments, ...updateAttachments],
    updatedAt: now(),
  };

  const restComments = blog.comments.filter((comment) => comment.id !== commentId);

  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment],
      lastActivityAt: now(),
    },
  };
};

export class UpdateCommentCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateCommentRequest) {
    super();
  }
}
