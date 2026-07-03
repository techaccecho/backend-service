import { api } from '@lib/data';
import type { UpdateApi } from '@lib/domain';
import {
  type AsyncValidation,
  assertHasStringKey,
  assertRequired,
  NotFoundError,
  ValidationError,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyRequest } from 'fastify';

export const verifyMutateApi = async (
  convex: ConvexHttpClient,
  request: FastifyRequest,
) => {
  assertHasStringKey(request.params, 'apiId');

  const { apiId } = request.params;

  const response = await convex.query(api.apis.find, { id: apiId });

  if (response == null) {
    throw new NotFoundError({ resource: `api with id ${apiId}` });
  }

  request.api = response;
};

export const verifyMutateFeature = async (
  convex: ConvexHttpClient,
  request: FastifyRequest,
) => {
  await verifyMutateApi(convex, request);

  const { params, api } = request;

  assertHasStringKey(params, 'featureId');
  assertRequired('api', api);

  const { featureId } = params;

  const featureResponse = api.features.find(
    (feature) => feature.id === featureId,
  );

  if (featureResponse == null) {
    throw new NotFoundError({ resource: `feature with id ${featureId}` });
  }

  request.feature = featureResponse;
};

export const verifyMutateSubscriber = async (
  convex: ConvexHttpClient,
  request: FastifyRequest,
) => {
  await verifyMutateApi(convex, request);

  const { params, api } = request;

  assertHasStringKey(params, 'subscriberId');
  assertRequired('api', api);

  const { subscriberId } = params;

  const subscriberResponse = api.subscribers.find(
    (subscriber) => subscriber.id === subscriberId,
  );

  if (subscriberResponse == null) {
    throw new NotFoundError({ resource: `subscriber with id ${subscriberId}` });
  }

  request.subscriber = subscriberResponse;
};

export const verifyUpdateApi = async (
  convex: ConvexHttpClient,
  validation: AsyncValidation,
  request: FastifyRequest<{ Body: UpdateApi }>,
) => {
  await verifyMutateApi(convex, request);

  const update = request.body;

  const validationDetails = await validation
    .validator()
    .notEmpty({ value: update })
    .validate();

  if (validationDetails.length > 0) {
    throw new ValidationError({ details: validationDetails });
  }
};
