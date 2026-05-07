import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex/_generated/api';
import { NotFoundError, toData, type UserData } from '../../../lib';
import { TOKENS } from '../../../tokens';
import { toUser } from '../users.schema';
import { GetUserQuery } from './get-user.query';

@injectable()
@requestHandler(GetUserQuery)
export class GetUserHandler implements RequestHandler<GetUserQuery, UserData> {
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(query: GetUserQuery): Promise<UserData> {
    const { id } = query.request;

    this.logger.info({ id }, `Getting user: ${id}`);

    const user = await this.convex.query(api.users.find, {
      id,
    });

    if (user == null) {
      throw new NotFoundError({ resource: `user with id ${id}` });
    }

    return toData({ data: toUser(user) });
  }
}
