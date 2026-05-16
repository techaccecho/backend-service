import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../convex';
import { toData, toUser, type UserData } from '../schemas';
import { NotFoundError } from '../types';
import { TOKENS } from '../util';
import { GetUserByAuthIdQuery } from './get-user-by-auth-id.query';

@injectable()
@requestHandler(GetUserByAuthIdQuery)
export class GetUserByAuthIdHandler
  implements RequestHandler<GetUserByAuthIdQuery, UserData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUserByAuthIdQuery): Promise<UserData> {
    const { authId } = query.request;

    this.logger.info({ authId }, `Getting user by auth id: ${authId}`);

    const user = await this.convex.query(api.users.findByAuthId, {
      authId,
    });

    if (user == null) {
      throw new NotFoundError({ resource: `user with authId ${authId}` });
    }

    return toData({ data: toUser(user) });
  }
}
