import type { Doc, ReactionEntity, UpdateBlogArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const UpdateReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
  reactionId: Type.String({
    description: 'The id of the reaction',
    format: 'uuid',
  }),
});

export type UpdateReactionParams = Static<typeof UpdateReactionParamsSchema>;

export const UpdateReactionSchema = Type.Object({
  code: Type.String({ description: 'The ASCII code of the reaction' }),
});

export type UpdateReaction = Static<typeof UpdateReactionSchema>;

export type UpdateReactionRequest = {
  params: UpdateReactionParams;
  update: UpdateReaction;
  existing: ReactionEntity;
  blog: Doc<'blogs'>;
};

export const toUpdateReactionArgs = (
  request: UpdateReactionRequest,
): UpdateBlogArgs => {
  const { params, update, existing, blog } = request;
  const { reactionId } = params;

  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now(),
  };

  const restReactions = blog.reactions.filter(
    (reaction) => reaction.id !== reactionId,
  );

  return {
    id: blog._id,
    updates: {
      reactions: [...restReactions, updateReaction],
    },
  };
};

export class UpdateReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: UpdateReactionRequest) {
    super();
  }
}
