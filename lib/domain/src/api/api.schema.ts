import type { Doc } from '@lib/data';
import { DataSchema, PaginatedDataSchema, toISO } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';

export const FeatureSchema = Type.Object({
  name: Type.String(),
  enabled: Type.Boolean(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Feature = Static<typeof FeatureSchema>;

export const SubscriptionSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  type: Type.Union([Type.Literal('api-key')]),
  value: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Subscription = Static<typeof SubscriptionSchema>;

export const ApiConfigSchema = Type.Object({
  auth: Type.Object({
    jkwsUri: Type.String(),
    audience: Type.String(),
    issuer: Type.String(),
  }),
});

export type ApiConfig = Static<typeof ApiConfigSchema>;

export const ApiSchema = Type.Object({
  _id: Type.String(),
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  config: ApiConfigSchema,
  features: Type.Array(FeatureSchema),
  subscribers: Type.Array(SubscriptionSchema),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Api = Static<typeof ApiSchema>;

export const ApiDataSchema = DataSchema(ApiSchema);

export type ApiData = Static<typeof ApiDataSchema>;

export const PaginatedApiDataSchema = PaginatedDataSchema(ApiSchema);

export type PaginatedApiData = Static<typeof PaginatedApiDataSchema>;

export const toApi = (request: Doc<'apis'>): Api => ({
  ...request,
  config: {
    ...request.config,
    auth: {
      ...request.config.auth,
    },
  },
  features: request.features.map((e) => ({
    ...e,
    createdAt: toISO(e.createdAt),
    updatedAt: toISO(e.updatedAt),
  })),
  subscribers: request.subscribers.map((e) => ({
    ...e,
    createdAt: toISO(e.createdAt),
    updatedAt: toISO(e.updatedAt),
  })),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});

export const assertApi: (
  api?: Doc<'apis'> | null,
) => asserts api is Doc<'apis'> = (api) => {
  if (api == null) {
    throw new Error('api is null/undefined');
  }
};
