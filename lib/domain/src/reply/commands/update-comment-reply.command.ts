import type {
  AttachmentEntity,
  CommentEntity,
  Doc,
  ReplyEntity,
  UpdateBlogArgs,
} from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../../blog/index.js';

export const UpdateCommentReplyParamsSchema = Type.Object({
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
});

export type UpdateCommentReplyParams = Static<
  typeof UpdateCommentReplyParamsSchema
>;

export const UpdateCommentReplyAttachmentSchema = Type.Partial(
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

export type UpdateCommentReplyAttachment = Static<typeof UpdateCommentReplyAttachmentSchema>;

export const UpdateCommentReplySchema = Type.Object({
  content: Type.String({ description: 'The actual content' }),
  attachments: Type.Array(UpdateCommentReplyAttachmentSchema, {
    description: 'The attachments referenced',
  }),
});

export type UpdateCommentReply = Static<typeof UpdateCommentReplySchema>;

export type UpdateCommentReplyRequest = {
  params: UpdateCommentReplyParams;
  update: UpdateCommentReply;
  existing: ReplyEntity;
  blog: Doc<'blogs'>;
  comment: CommentEntity;
};

export const toUpdateCommentReplyArgs = (
  request: UpdateCommentReplyRequest,
): UpdateBlogArgs => {
  const { params, update, existing, blog, comment } = request;
  const { replyId } = params;

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

  const updateReply = {
    ...existing,
    content: update.content ?? existing.content,
    attachments: [...restAttachments, ...updateAttachments],
    updatedAt: now(),
  };

  const restReplies = comment.replies.filter((reply) => reply.id !== replyId);

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

export class UpdateCommentReplyCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateCommentReplyRequest) {
    super();
  }
}
