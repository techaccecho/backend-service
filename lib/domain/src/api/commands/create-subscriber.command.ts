import type { Doc, UpdateApiArgs } from '@lib/data';
import { now, uuid } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const CreateSubscriberParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
});

export type CreateSubscriberParams = Static<typeof CreateSubscriberParamsSchema>;

export const CreateSubscriberSchema = Type.Object({
  name: Type.String(),
  type: Type.Union([Type.Literal('api-key')]),
  value: Type.String(),
});

export type CreateSubscriber = Static<typeof CreateSubscriberSchema>;

export type CreateSubscriberRequest = {
  params: CreateSubscriberParams;
  create: CreateSubscriber;
  existing: Doc<'apis'>;
};

export const toCreateSubscriberArgs = (
  request: CreateSubscriberRequest,
): UpdateApiArgs => {
  const { create, existing } = request;

  const createSubscriber = {
    id: uuid(),
    name: create.name,
    type: create.type,
    value: create.value,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now(),
  };

  return {
    id: existing._id,
    updates: {
      subscribers: [...existing.subscribers, createSubscriber],
    },
  };
};

export class CreateSubscriberCommand extends RequestData<ApiData> {
  constructor(public readonly request: CreateSubscriberRequest) {
    super();
  }
}
