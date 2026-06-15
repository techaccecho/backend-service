import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  DeleteFeatureCommand,
  toDeleteFeatureArgs,
} from './delete-feature.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(DeleteFeatureCommand)
export class DeleteFeatureHandler
  implements RequestHandler<DeleteFeatureCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteFeatureCommand): Promise<ApiData> {
    const { request } = command;
    const { params, existing } = request;
    const { apiId, featureId } = params;

    this.logger.info({ featureId }, `Deleting feature: ${featureId}`);

    const args = toDeleteFeatureArgs(request);

    const updated = await this.convex.mutation(api.apis.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
