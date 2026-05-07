import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex/_generated/api';
import { type PaginatedUserData, toPaginatedData, toQuery } from '../../../lib';
import { TOKENS } from '../../../tokens';
import { toUser } from '../users.schema';
import { GetUsersQuery } from './get-users.query';

@injectable()
@requestHandler(GetUsersQuery)
export class GetUsersHandler
  implements RequestHandler<GetUsersQuery, PaginatedUserData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUsersQuery): Promise<PaginatedUserData> {
    this.logger.info('Getting users');

    const users = await this.convex.query(api.users.list, {
      paginationOpts: toQuery(query.request),
    });

    return toPaginatedData({ result: users, mapper: toUser });
  }
}
