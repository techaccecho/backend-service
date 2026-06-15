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
  toUpdateFeatureArgs,
  UpdateFeatureCommand,
} from './update-feature.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(UpdateFeatureCommand)
export class UpdateFeatureHandler
  implements RequestHandler<UpdateFeatureCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: UpdateFeatureCommand): Promise<ApiData> {
    const { request } = command;
    const { params } = request;
    const { featureId, apiId } = params;

    this.logger.info({ featureId }, `Updating feature: ${featureId}`);

    const updated = await this.convex.mutation(
      api.apis.update,
      toUpdateFeatureArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
