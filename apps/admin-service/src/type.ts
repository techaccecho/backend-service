import type { ApiFeatureEntity, ApiSubscriberEntity, Doc } from '@lib/data';

declare module 'fastify' {
  interface FastifyRequest {
    api?: Doc<'apis'>;
    feature?: ApiFeatureEntity;
    subscriber?: ApiSubscriberEntity;
  }
}
