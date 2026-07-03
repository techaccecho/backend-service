import { api } from '@lib/data';
import { Tokens, toPaginatedData, toQuery } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type PaginatedUserData, toUser } from '../user.schema.js';
import { GetUsersQuery } from './get-users.query.js';

@injectable()
@requestHandler(GetUsersQuery)
export class GetUsersHandler
  implements RequestHandler<GetUsersQuery, PaginatedUserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUsersQuery): Promise<PaginatedUserData> {
    const { request } = query;
    this.logger.info('Getting users');

    const result = await this.convex.query(api.users.list, {
      paginationOpts: toQuery(request.query),
    });

    return toPaginatedData({
      result,
      mapper: toUser,
    });
  }
}
