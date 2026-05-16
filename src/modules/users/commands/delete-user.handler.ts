import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { api } from '../../../../convex';
import { NotFoundError, TOKENS } from '../../../lib';
import { DeleteUserCommand } from './delete-user.command';

@injectable()
@requestHandler(DeleteUserCommand)
export class DeletePostHandler
  implements RequestHandler<DeleteUserCommand, void>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteUserCommand): Promise<void> {
    const { id } = command.request;

    this.logger.info({ id }, `Deleting user: ${id}`);

    const existing = await this.convex.query(api.users.find, { id });

    if (existing == null) {
      throw new NotFoundError({ resource: `user with id ${id}` });
    }

    await this.convex.mutation(api.users.remove, {
      id: existing._id,
    });
  }
}
