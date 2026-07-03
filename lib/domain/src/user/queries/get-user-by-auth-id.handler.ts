import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { toUser, type UserData } from '../user.schema.js';
import { GetUserByAuthIdQuery } from './get-user-by-auth-id.query.js';

@injectable()
@requestHandler(GetUserByAuthIdQuery)
export class GetUserByAuthIdHandler
  implements RequestHandler<GetUserByAuthIdQuery, UserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUserByAuthIdQuery): Promise<UserData> {
    const { request } = query;
    const { params } = request;
    const { authId } = params;

    this.logger.info({ authId }, `Getting user by auth id: ${authId}`);

    const response = await this.convex.query(api.users.findByAuthId, {
      authId,
    });

    if (response == null) {
      throw new NotFoundError({ resource: `user with authId ${authId}` });
    }

    return toData({ data: toUser(response) });
  }
}
