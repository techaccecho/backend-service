import type { Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const CreateParticipantParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type CreateParticipantParams = Static<
  typeof CreateParticipantParamsSchema
>;

export const CreateParticipantSchema = Type.Object({
  userId: Type.String({ description: 'User id' }),
});

export type CreateParticipant = Static<typeof CreateParticipantSchema>;

export type CreateParticipantRequest = {
  params: CreateParticipantParams;
  create: CreateParticipant;
  user: Doc<'users'>;
  existing: Doc<'blogs'>;
};

export const toCreateParticipantArgs = (
  request: CreateParticipantRequest,
): UpdateBlogArgs => {
  const { user, existing } = request;

  const createParticipant = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return {
    id: existing._id,
    updates: {
      participants: [...existing.participants, createParticipant],
    },
  };
};

export class CreateParticipantCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateParticipantRequest) {
    super();
  }
}
