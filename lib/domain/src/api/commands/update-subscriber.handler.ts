import { api } from '@lib/data';
import {
  NotFoundError,
  toData,
  Tokens,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  toUpdateSubscriberArgs,
  UpdateSubscriberCommand,
} from './update-subscriber.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(UpdateSubscriberCommand)
export class UpdateSubscriberHandler
  implements RequestHandler<UpdateSubscriberCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient
  ) {}

  async handle(command: UpdateSubscriberCommand): Promise<ApiData> {
    const { request } = command;
    const { params } = request;
    const { subscriberId, apiId } = params;

    this.logger.info({ subscriberId }, `Updating subscriber: ${subscriberId}`);

    const updated = await this.convex.mutation(
      api.apis.update,
      toUpdateSubscriberArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
