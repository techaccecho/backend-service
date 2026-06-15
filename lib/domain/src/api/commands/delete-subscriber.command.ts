import type { ApiSubscriberEntity, Doc, UpdateApiArgs } from '@lib/data';
import { type Static, Type } from '@sinclair/typebox';
import { RequestData } from 'mediatr-ts';
import { ApiData } from '../api.schema.js';

export const DeleteSubscriberParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
  subscriberId: Type.String({
    description: 'The id of the subscriber',
    format: 'uuid',
  }),
});

export type DeleteSubscriberParams = Static<
  typeof DeleteSubscriberParamsSchema
>;

export type DeleteSubscriberRequest = {
  params: DeleteSubscriberParams;
  existing: ApiSubscriberEntity;
  api: Doc<'apis'>;
};

export const toDeleteSubscriberArgs = (
  request: DeleteSubscriberRequest,
): UpdateApiArgs => {
  const { existing, api } = request;
  const restSubscribers = api.subscribers.filter(
    (subscriber) => subscriber.id !== existing.id,
  );

  return {
    id: api._id,
    updates: {
      subscribers: restSubscribers,
    },
  };
};

export class DeleteSubscriberCommand extends RequestData<ApiData> {
  constructor(public readonly request: DeleteSubscriberRequest) {
    super();
  }
}
