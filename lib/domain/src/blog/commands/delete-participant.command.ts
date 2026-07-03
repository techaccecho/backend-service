import type { Doc, UpdateBlogArgs, UserPreviewEntity } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const DeleteParticipantParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  userId: Type.String({
    description: 'The id of the user',
    format: 'uuid',
  }),
});

export type DeleteParticipantParamsSchema = Static<
  typeof DeleteParticipantParamsSchema
>;

export type DeleteParticipantRequest = {
  params: DeleteParticipantParamsSchema;
  existing: UserPreviewEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteParticipantArgs = (
  request: DeleteParticipantRequest,
): UpdateBlogArgs => {
  const { existing, blog } = request;
  const restParticipants = blog.participants.filter(
    (participant) => participant.id !== existing.id,
  );

  return {
    id: blog._id,
    updates: {
      participants: restParticipants,
    },
  };
};

export class DeleteParticipantCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteParticipantRequest) {
    super();
  }
}
