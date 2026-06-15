import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { GetApiQuery } from './get-api.query.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(GetApiQuery)
export class GetPostHandler
  implements RequestHandler<GetApiQuery, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetApiQuery): Promise<ApiData> {
    const { request } = query;
    const { params } = request;
    const { apiId } = params;

    this.logger.info({ apiId }, `Getting api: ${apiId}`);

    const response = await this.convex.query(api.apis.find, {
      id: apiId,
    });

    if (response == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }

    return toData({ data: toApi(response)});
  }
}
