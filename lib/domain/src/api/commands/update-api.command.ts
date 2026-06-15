import type { Doc, Id, UpdateApiArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const UpdateApiParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
});

export type UpdateApiParams = Static<typeof UpdateApiParamsSchema>;

export const UpdateApiSchema = Type.Partial(
  Type.Object({
    name: Type.Optional(Type.String()),
    config: Type.Optional(
      Type.Object({
        auth: Type.Optional(
          Type.Object({
            jkwsUri: Type.Optional(Type.String()),
            audience: Type.Optional(Type.String()),
            issuer: Type.Optional(Type.String()),
          }),
        ),
      }),
    ),
  }),
);

export type UpdateApi = Static<typeof UpdateApiSchema>;

export type UpdateApiRequest = {
  params: UpdateApiParams;
  update: UpdateApi;
  existing: Doc<'apis'>;
};

export const toUpdateApiArgs = (request: UpdateApiRequest): UpdateApiArgs => {
  const { update, existing } = request;
  const { config } = update;
  const { config: existingConfig } = existing;

  const { auth: existingAuth } = existingConfig;

  const updateConfig = {
    ...config,
    auth: (config?.auth && {
      jkwsUri: config.auth.jkwsUri ?? existingAuth.jkwsUri,
      audience: config.auth.audience ?? existingAuth.audience,
      issuer: config.auth.issuer ?? existingAuth.issuer,
    }) ?? { ...existingAuth },
  };

  return {
    id: existing._id as Id<'apis'>,
    updates: {
      name: update.name ?? existing.name,
      config: updateConfig,
      updatedAt: now(),
    },
  };
};

export class UpdateApiCommand extends RequestData<ApiData> {
  constructor(
    public readonly request: UpdateApiRequest
  ) {
    super();
  }
}
