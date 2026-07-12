import type { AttachmentEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';
import { sanitizeBlogContent } from '../blog-content.js';

export const UpdateBlogParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type UpdateBlogParams = Static<typeof UpdateBlogParamsSchema>;

const UpdateAttachmentSchema = Type.Partial(
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

export const UpdateBlogSchema = Type.Partial(
  Type.Object({
    title: Type.String({ description: 'The title' }),
    content: Type.String({
      description: 'The actual content',
      minLength: 1,
      maxLength: 5000,
    }),
    priority: Type.Number({
      description: 'The priority',
    }),
    isDraft: Type.Boolean({ description: 'Whether is draft' }),
    isPinned: Type.Boolean({ description: 'Whether is pinned' }),
    isLocked: Type.Boolean({ description: 'Whether is locked' }),
    attachments: Type.Array(UpdateAttachmentSchema, {
      description: 'The attachments referenced',
    }),
  }),
);

export type UpdateBlog = Static<typeof UpdateBlogSchema>;

export type UpdateBlogRequest = {
  params: UpdateBlogParams;
  update: UpdateBlog;
  existing: Doc<'blogs'>;
};

export const toUpdateBlogArgs = (
  request: UpdateBlogRequest,
): UpdateBlogArgs => {
  const { update, existing } = request;

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

  return {
    id: existing._id,
    updates: {
      title: update.title?.trim() ?? existing.title,
      content:
        update.content != null
          ? sanitizeBlogContent(update.content)
          : existing.content,
      priority: update.priority ?? existing.priority,
      isDraft: update.isDraft ?? existing.isDraft,
      isPinned: update.isPinned ?? existing.isPinned,
      isLocked: update.isLocked ?? existing.isLocked,
      attachments: [...restAttachments, ...updateAttachments],
      updatedAt: Date.now(),
      lastActivityAt: Date.now(),
    },
  };
};

export class UpdateBlogCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateBlogRequest) {
    super();
  }
}
