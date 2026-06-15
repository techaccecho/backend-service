import { api } from '@lib/data';
import { Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { DeleteApiCommand } from './delete-api.command.js';

@injectable()
@requestHandler(DeleteApiCommand)
export class DeleteApiHandler
  implements RequestHandler<DeleteApiCommand, void>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: DeleteApiCommand): Promise<void> {
    const { request } = command;
    const { existing } = request;
    const { _id, id } = existing;

    this.logger.info({ id }, `Deleting api: ${id}`);
    await this.convex.mutation(api.apis.remove, {
      id: _id,
    });
  }
}
