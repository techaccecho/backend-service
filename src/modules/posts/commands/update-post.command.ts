import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { Id, UpdatePostArgs } from '../../../../convex';
import { type IdParam, IdParamSchema, type PostData } from '../../../lib';

export const UpdatePostParamSchema = IdParamSchema(
  'The id of the post to update',
);

export const UpdatePostSchema = Type.Partial(
  Type.Object({
    title: Type.String({ description: 'The title of the post' }),
    content: Type.String({
      description: 'The actual content/description of the post',
    }),
    priority: Type.Optional(
      Type.Number({
        description:
          'The priority to be given to the post. Helps with prioritizing posts',
      }),
    ),
    isPinned: Type.Optional(
      Type.Boolean({ description: 'Whether the post is pinned' }),
    ),
    isLocked: Type.Optional(
      Type.Boolean({ description: 'Whether the post is locked' }),
    ),
    media: Type.Optional(
      Type.String({ description: 'The media referenced in the post' }),
    ),
  }),
);

export type UpdatePost = Static<typeof UpdatePostSchema>;

export const toUpdatePostArgs = (
  id: Id<'posts'>,
  request: UpdatePost,
): UpdatePostArgs => ({
  id,
  updates: {
    ...request,
    media: [],
    updatedAt: Date.now(),
    lastActivityAt: Date.now(),
  },
});

export class UpdatePostCommand extends RequestData<PostData> {
  constructor(
    public readonly param: IdParam,
    public readonly request: UpdatePost,
  ) {
    super();
  }
}
