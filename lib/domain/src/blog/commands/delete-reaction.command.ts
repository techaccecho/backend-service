import type { ReactionEntity, Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { BlogData } from '../blog.schema.js';

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
    },
  };
};

export class DeleteReactionCommand extends RequestData<BlogData> {
  constructor(public readonly request: DeleteReactionRequest) {
    super();
  }
}
