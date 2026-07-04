import type { AttachmentEntity } from '@lib/data';
import { toISO } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';

export const AttachmentSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  type: Type.Union([Type.Literal('media/image')]),
  url: Type.Union([Type.String(), Type.Null()]),
  content: Type.Union([Type.String(), Type.Null()]),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Attachment = Static<typeof AttachmentSchema>;

export const toAttachment = (request: AttachmentEntity): Attachment => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});
