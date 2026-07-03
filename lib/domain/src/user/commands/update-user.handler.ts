import { api } from '@lib/data';
import { NotFoundError, Tokens, toData } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { toUser, type UserData } from '../user.schema.js';
import { toUpdateUserArgs, UpdateUserCommand } from './update-user.command.js';

@injectable()
@requestHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements RequestHandler<UpdateUserCommand, UserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: UpdateUserCommand): Promise<UserData> {
    const { request } = command;
    const { params } = request;
    const { userId } = params;

    this.logger.info({ userId }, `Updating user: ${userId}`);

    const updated = await this.convex.mutation(
      api.users.update,
      toUpdateUserArgs(request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource: `user with id ${userId}` });
    }

    return toData({ data: toUser(updated) });
  }
}
