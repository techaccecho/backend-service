import type { ApiSubscriberEntity, Doc, UpdateApiArgs } from '@lib/data';
import { now } from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const UpdateSubscriberParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
  subscriberId: Type.String({
    description: 'The id of the subscriber',
    format: 'uuid',
  }),
});

export type UpdateSubscriberParams = Static<typeof UpdateSubscriberParamsSchema>;

export const UpdateSubscriberSchema = Type.Partial(
  Type.Object({
    name: Type.String(),
    type: Type.Union([Type.Literal('api-key')]),
    value: Type.String(),
  }),
);

export type UpdateSubscriber = Static<typeof UpdateSubscriberSchema>;

export type UpdateSubscriberRequest = {
  params: UpdateSubscriberParams;
  update: UpdateSubscriber;
  existing: ApiSubscriberEntity;
  api: Doc<'apis'>;
};

export const toUpdateSubscriberArgs = (
  request: UpdateSubscriberRequest,
): UpdateApiArgs => {
  const { params, update, existing, api } = request;
  const { subscriberId } = params;

  const updateSubscriber = {
    ...existing,
    name: update.name ?? existing.name,
    type: update.type ?? existing.type,
    value: update.value ?? existing.value,
    updatedAt: now(),
  };

  const restSubscribers = api.subscribers.filter(
    (subscriber) => subscriber.id !== subscriberId,
  );

  return {
    id: api._id,
    updates: {
      subscribers: [...restSubscribers, updateSubscriber],
      lastActivityAt: now(),
    },
  };
};

export class UpdateSubscriberCommand extends RequestData<ApiData> {
  constructor(public readonly request: UpdateSubscriberRequest) {
    super();
  }
}
