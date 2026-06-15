import type { CreateApiArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const CreateApiSchema = Type.Object({
  name: Type.String(),
  config: Type.Object({
    auth: Type.Object({
      jkwsUri: Type.String(),
      audience: Type.String(),
      issuer: Type.String(),
    }),
  }),
});

export type CreateApi = Static<typeof CreateApiSchema>;

export type CreateApiRequest = {
  create: CreateApi;
};

export const toCreateApiArgs = (request: CreateApiRequest): CreateApiArgs => {
  const { create } = request;
  const { config } = create;
  const { auth } = config;

  const createConfig = {
    auth: {
      jkwsUri: auth.jkwsUri,
      audience: auth.audience,
      issuer: auth.issuer,
    },
  };

  return {
    ...request,
    id: uuid(),
    name: create.name,
    config: createConfig,
    features: [],
    subscribers: [],
    createdAt: now(),
    updatedAt: null,
  };
};

export class CreateApiCommand extends RequestData<ApiData> {
  constructor(public readonly request: CreateApiRequest) {
    super();
  }
}
