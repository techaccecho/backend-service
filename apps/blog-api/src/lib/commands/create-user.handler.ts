import { randomUUID } from 'node:crypto';
import { api } from '@backend-service/convex';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import {} from '..';
import { AsyncValidation, toData, toUser, type UserData } from '../schemas';

import { NotFoundError, ValidationError } from '../types';
import { TOKENS } from '../util';
import { CreateUserCommand, toCreateUserArgs } from './create-user.command';

@injectable()
@requestHandler(CreateUserCommand)
export class CreateUserHandler
  implements RequestHandler<CreateUserCommand, UserData>
{
  constructor(
    @inject(TOKENS.Logger) private readonly logger: FastifyBaseLogger,
    @inject(TOKENS.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: CreateUserCommand): Promise<UserData> {
    const { request } = command;

    const { email, alias } = request;

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

    const userId = randomUUID();

    await this.convex.mutation(
      api.users.create,
      toCreateUserArgs(request, userId),
    );

    const user = await this.convex.query(api.users.find, { id: userId });

    if (user == null) {
      throw new NotFoundError({ resource: `user with id ${userId}` });
    }

    return toData({ data: toUser(user) });
  }
}
