import { api } from '@lib/data';
import { NotFoundError, Tokens, toData, ValidationError } from '@lib/util';
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

    const { update, existing } = request;
    this.logger.info({ userId }, `Updating user profile: ${userId}`);
    const alias = update.alias;
    if (alias != null && alias !== existing.alias) {
      const aliasRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      if (!aliasRegex.test(alias)) {
        throw new ValidationError({
          details: [
            {
              path: '/alias',
              message:
                'Alias must be between 3 and 30 characters and can only contain letters, numbers, underscores, and hyphens.',
            },
          ],
        });
      }

      const userWithAlias = await this.convex.query(api.users.findByAlias, {
        alias,
      });
      if (userWithAlias != null) {
        throw new ValidationError({
          details: [
            {
              path: '/alias',
              message: `Alias '${alias}' already exists`,
            },
          ],
        });
      }
    }

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
