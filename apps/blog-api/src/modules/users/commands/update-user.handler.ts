import { api } from '@backend-service/convex';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {
  AsyncValidation,
  NotFoundError,
  TOKENS,
  toData,
  toUser,
  type UserData,
  ValidationError,
} from '../../../lib';
import { toUpdateUserArgs, UpdateUserCommand } from './update-user.command';

@injectable()
@requestHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements RequestHandler<UpdateUserCommand, UserData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: UpdateUserCommand): Promise<UserData> {
    const { request } = command;
    const { id } = command.param;

    this.logger.info({ id: id }, `Updating user: ${id}`);

    const validationDetails = await this.validation
      .validator()
      .notEmpty({ value: request })
      .validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const existing = await this.convex.query(api.users.find, { id });

    const resource = `user with id ${id}`;

    if (existing == null) {
      throw new NotFoundError({ resource });
    }

    const updated = await this.convex.mutation(
      api.users.update,
      toUpdateUserArgs(existing._id, request),
    );

    if (updated == null) {
      throw new NotFoundError({ resource });
    }

    return toData({ data: toUser(updated) });
  }
}
