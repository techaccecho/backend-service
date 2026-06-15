import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const GetApiParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
});

export type GetApiParams = Static<typeof GetApiParamsSchema>;

export type GetApiRequest = {
  params: GetApiParams;
};

export class GetApiQuery extends RequestData<ApiData> {
  constructor(public readonly request: GetApiRequest) {
    super();
  }
}
