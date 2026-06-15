import { api } from '@lib/data';
import { Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { DeleteUserCommand } from './delete-user.command.js';

@injectable()
@requestHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements RequestHandler<DeleteUserCommand, void>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteUserCommand): Promise<void> {
    const { request } = command;
    const { params, existing } = request;
    const { userId } = params;

    this.logger.info({ userId }, `Deleting user: ${userId}`);

    await this.convex.mutation(api.users.remove, {
      id: existing._id,
    });
  }
}
