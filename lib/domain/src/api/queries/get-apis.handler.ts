import { api } from '@lib/data';
import { Tokens, toPaginatedData, toQuery } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { GetApisQuery } from './get-apis.query.js';
import { PaginatedApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(GetApisQuery)
export class GetPostsHandler
  implements RequestHandler<GetApisQuery, PaginatedApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetApisQuery): Promise<PaginatedApiData> {
    const { request } = query;

    this.logger.info('Getting apis');

    const result = await this.convex.query(api.apis.list, {
      paginationOpts: toQuery(request.query),
    });

    return toPaginatedData({
      result,
      mapper: toApi
    })
  }
}
