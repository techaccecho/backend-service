import type { Doc, UpdateBlogArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../index.js';

export const CreateReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type CreateReactionParams = Static<typeof CreateReactionParamsSchema>;

export const CreateReactionSchema = Type.Object({
  userId: Type.String({ description: 'The id of the reactor' }),
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type CreateReaction = Static<typeof CreateReactionSchema>;

export type CreateReactionRequest = {
  params: CreateReactionParams;
  create: CreateReaction;
  existing: Doc<'blogs'>;
  user: Doc<'users'>;
};

export const toCreateReactionArgs = (
  request: CreateReactionRequest,
): UpdateBlogArgs => {
  const { create, existing, user } = request;

  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const createReaction = {
    id: uuid(),
    user: createUser,
    code: create.code,
    createdAt: now(),
    updatedAt: null,
  };

  const updateReactions = [...existing.reactions, createReaction];

  return {
    id: existing._id,
    updates: {
      reactions: updateReactions,
      engagement: {
        ...existing.engagement,
        reactions: updateReactions.length,
      },
    },
  };
};

export class CreateReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateReactionRequest) {
    super();
  }
}
