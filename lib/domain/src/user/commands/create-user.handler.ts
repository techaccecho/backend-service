import { api } from '@lib/data';
import {
  AsyncValidation,
  NotFoundError,
  toData,
  Tokens,
  ValidationError,
} from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { CreateUserCommand, toCreateUserArgs } from './create-user.command.js';
import { toUser, UserData } from '../user.schema.js';

@injectable()
@requestHandler(CreateUserCommand)
export class CreateUserHandler
  implements RequestHandler<CreateUserCommand, UserData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: CreateUserCommand): Promise<UserData> {
    const { request } = command;
    const { create } = request;
    const { email, alias } = create;

    this.logger.info({ email: email }, `Creating user: ${email}`);

    const validator = this.validation.validator();

    validator.uniqueEmail({ value: email });

    if (alias != null) {
      validator.uniqueAlias({ value: alias });
    }

    const validationDetails = await validator.validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const args = toCreateUserArgs(request);
    const { id } = args;

    await this.convex.mutation(api.users.create, args);

    const created = await this.convex.query(api.users.find, { id });

    if (created == null) {
      throw new NotFoundError({ resource: `user with id ${id}` });
    }

    return toData({ data: toUser(created)});
  }
}
