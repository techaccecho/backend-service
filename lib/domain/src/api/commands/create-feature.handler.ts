import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  CreateFeatureCommand,
  toCreateFeatureArgs,
} from './create-feature.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(CreateFeatureCommand)
export class CreateFeatureHandler
  implements RequestHandler<CreateFeatureCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateFeatureCommand): Promise<ApiData> {
    const { request } = command;
    const { params } = request;
    const { apiId } = params;

    this.logger.info({ apiId }, `Creating feature for api: ${apiId}`);

    const args = toCreateFeatureArgs(request);

    const updated = await this.convex.mutation(api.apis.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
