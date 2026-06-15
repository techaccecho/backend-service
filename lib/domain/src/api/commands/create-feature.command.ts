import type { Doc, UpdateApiArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const CreateFeatureParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
});

export type CreateFeatureParams = Static<typeof CreateFeatureParamsSchema>;

export const CreateFeatureSchema = Type.Object({
  name: Type.String(),
  enabled: Type.Boolean(),
});

export type CreateFeature = Static<typeof CreateFeatureSchema>;

export type CreateFeatureRequest = {
  params: CreateFeatureParams;
  create: CreateFeature;
  existing: Doc<'apis'>;
};

export const toCreateFeatureArgs = (
  request: CreateFeatureRequest,
): UpdateApiArgs => {
  const { create, existing } = request;

  const createFeature = {
    id: uuid(),
    name: create.name,
    enabled: create.enabled,
    createdAt: now(),
    updatedAt: null,
  };

  return {
    id: existing._id,
    updates: {
      features: [...existing.features, createFeature],
    },
  };
};

export class CreateFeatureCommand extends RequestData<ApiData> {
  constructor(public readonly request: CreateFeatureRequest) {
    super();
  }
}
