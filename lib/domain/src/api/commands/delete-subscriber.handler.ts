import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  DeleteSubscriberCommand,
  toDeleteSubscriberArgs,
} from './delete-subscriber.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(DeleteSubscriberCommand)
export class DeleteSubscriberHandler
  implements RequestHandler<DeleteSubscriberCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteSubscriberCommand): Promise<ApiData> {
    const { request } = command;
    const { params } = request;
    const { apiId,subscriberId } = params;

    this.logger.info({ subscriberId }, `Deleting feature: ${subscriberId}`);

    const args = toDeleteSubscriberArgs(request);

    const updated = await this.convex.mutation(api.apis.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
