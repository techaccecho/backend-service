import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { GetUserQuery } from './get-user.query.js';
import { toUser, UserData } from '../user.schema.js';

@injectable()
@requestHandler(GetUserQuery)
export class GetUserHandler
  implements RequestHandler<GetUserQuery, UserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUserQuery): Promise<UserData> {
    const { request } = query;
    const { params } = request;
    const { userId } = params;

    this.logger.info({ userId }, `Getting user: ${userId}`);

    const response = await this.convex.query(api.users.find, {
      id: userId,
    });

    if (response == null) {
      throw new NotFoundError({ resource: `user with id ${userId}` });
    }

    return toData({ data: toUser(response)});
  }
}
