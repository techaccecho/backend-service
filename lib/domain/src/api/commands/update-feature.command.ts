import type { ApiFeatureEntity, Doc, UpdateApiArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const UpdateFeatureParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
  featureId: Type.String({
    description: 'The id of the feature',
    format: 'uuid',
  }),
});

export type UpdateFeatureParams = Static<typeof UpdateFeatureParamsSchema>;

export const UpdateFeatureSchema = Type.Partial(
  Type.Object({
    name: Type.String(),
    enabled: Type.Boolean(),
  }),
);

export type UpdateFeature = Static<typeof UpdateFeatureSchema>;

export type UpdateFeatureRequest = {
  params: UpdateFeatureParams;
  update: UpdateFeature;
  existing: ApiFeatureEntity;
  api: Doc<'apis'>;
};

export const toUpdateFeatureArgs = (
  request: UpdateFeatureRequest,
): UpdateApiArgs => {
  const { params, update, existing, api } = request;
  const { featureId } = params;

  const updateFeature = {
    ...existing,
    name: update.name ?? existing.name,
    enabled: update.enabled ?? existing.enabled,
    updatedAt: now(),
  };

  const restFeatures = api.features.filter((feature) => feature.id !== featureId);

  return {
    id: api._id,
    updates: {
      features: [...restFeatures, updateFeature],
      lastActivityAt: now(),
    },
  };
};

export class UpdateFeatureCommand extends RequestData<ApiData> {
  constructor(public readonly request: UpdateFeatureRequest) {
    super();
  }
}
