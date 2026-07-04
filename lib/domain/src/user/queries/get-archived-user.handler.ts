import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { type ArchivedUserData, toArchivedUser } from '../user.schema.js';
import { GetArchivedUserQuery } from './get-user.query.js';

@injectable()
@requestHandler(GetArchivedUserQuery)
export class GetArchivedUserHandler
  implements RequestHandler<GetArchivedUserQuery, ArchivedUserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetArchivedUserQuery): Promise<ArchivedUserData> {
    const { request } = query;
    const { params } = request;
    const { userId } = params;

    this.logger.info({ userId }, `Getting archived user: ${userId}`);

    const response = await this.convex.query(api.users.findArchived, {
      id: userId,
    });

    if (response == null) {
      throw new NotFoundError({ resource: `archived user with id ${userId}` });
    }

    return toData({ data: toArchivedUser(response) });
  }
}
