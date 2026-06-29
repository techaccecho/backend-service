import { api } from '@lib/data';
import { Tokens, toPaginatedData, toQuery } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { GetArchivedUsersQuery } from './get-users.query.js';
import { PaginatedArchivedUserData, toArchivedUser } from '../user.schema.js';

@injectable()
@requestHandler(GetArchivedUsersQuery)
export class GetArchivedUsersHandler
  implements RequestHandler<GetArchivedUsersQuery, PaginatedArchivedUserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetArchivedUsersQuery): Promise<PaginatedArchivedUserData> {
    const { request } = query;
    this.logger.info('Getting archived users');

    const result = await this.convex.query(api.users.listArchived, {
      paginationOpts: toQuery(request.query),
    });

    return toPaginatedData({
      result,
      mapper: toArchivedUser
    });
  }
}
