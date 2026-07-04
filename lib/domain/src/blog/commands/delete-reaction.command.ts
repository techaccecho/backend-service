import type { Doc, ReactionEntity, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const DeleteReactionParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog',
    format: 'uuid',
  }),
});

export type DeleteReactionParamsSchema = Static<
  typeof DeleteReactionParamsSchema
>;

export type DeleteReactionRequest = {
  params: DeleteReactionParamsSchema;
  existing: ReactionEntity;
  blog: Doc<'blogs'>;
};

export const toDeleteReactionArgs = (
  request: DeleteReactionRequest,
): UpdateBlogArgs => {
  const { existing, blog } = request;
  const restReactions = blog.reactions.filter(
    (reaction) => reaction.id !== existing.id,
  );

  return {
    id: blog._id,
    updates: {
      reactions: restReactions,
      engagement: {
        ...blog.engagement,
        reactions: restReactions.length,
      },
    },
  };
};

export class DeleteReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteReactionRequest) {
    super();
  }
}
