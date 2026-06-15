import type { ApiFeatureEntity, Doc, UpdateApiArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const DeleteFeatureParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
  featureId: Type.String({
    description: 'The id of the feature',
    format: 'uuid',
  }),
});

export type DeleteFeatureParams = Static<typeof DeleteFeatureParamsSchema>;

export type DeleteFeatureRequest = {
  params: DeleteFeatureParams;
  existing: ApiFeatureEntity;
  api: Doc<'apis'>;
};

export const toDeleteFeatureArgs = (
  request: DeleteFeatureRequest,
): UpdateApiArgs => {
  const { existing, api } = request;
  const restFeatures = api.features.filter(
    (feature) => feature.id !== existing.id,
  );

  return {
    id: api._id,
    updates: {
      features: restFeatures,
    },
  };
};

export class DeleteFeatureCommand extends RequestData<ApiData> {
  constructor(public readonly request: DeleteFeatureRequest) {
    super();
  }
}
