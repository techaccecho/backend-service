import type { Doc, UpdateBlogArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import type { BlogData } from '../blog.schema.js';

export const CreateViewerParamsSchema = Type.Object({
  blogId: Type.String({
    description: 'The id of the blog to update',
    format: 'uuid',
  }),
});

export type CreateViewerParams = Static<typeof CreateViewerParamsSchema>;

export const CreateViewerSchema = Type.Object({
  userId: Type.String({ description: 'The id of the blog viewer' }),
});

export type CreateViewer = Static<typeof CreateViewerSchema>;

export type CreateViewerRequest = {
  params: CreateViewerParams;
  create: CreateViewer;
  existing: Doc<'blogs'>;
  user: Doc<'users'>;
};

export const toCreateViewerArgs = (
  request: CreateViewerRequest,
): UpdateBlogArgs => {
  const { existing, user } = request;

  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const updateViewers = [...existing.viewers, createViewer];

  return {
    id: existing._id,
    updates: {
      viewers: updateViewers,
      engagement: {
        ...existing.engagement,
        views: updateViewers.length,
      },
    },
  };
};

export class CreateViewerCommand extends RequestData<BlogData> {
  constructor(public readonly request: CreateViewerRequest) {
    super();
  }
}
