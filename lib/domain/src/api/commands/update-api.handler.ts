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
import { toUpdateApiArgs, UpdateApiCommand } from './update-api.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(UpdateApiCommand)
export class UpdateApiHandler
  implements RequestHandler<UpdateApiCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient
  ) {}

  async handle(command: UpdateApiCommand): Promise<ApiData> {
    const { request } = command;
    const { update, params, existing } = request;
    const { apiId } = params;

    this.logger.info({ apiId }, `Updating api: ${apiId}`);

    const updated = await this.convex.mutation(
      api.apis.update,
      toUpdateApiArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }

    return toData({ data: toApi(updated)});
  }
}
