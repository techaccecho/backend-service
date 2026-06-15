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
import { CreateApiCommand, toCreateApiArgs } from './create-api.command.js';
import { ApiData, toApi } from '../api.schema.js';

@injectable()
@requestHandler(CreateApiCommand)
export class CreateApiHandler
  implements RequestHandler<CreateApiCommand, ApiData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
    @inject(AsyncValidation)
    private readonly validation: AsyncValidation,
  ) {}

  async handle(command: CreateApiCommand): Promise<ApiData> {
    const { request } = command;
    const { create } = request;
    const { name } = create;

    this.logger.info({ name }, `Creating api: ${name}`);

    const validator = this.validation.validator();
    validator.uniqueApiName({ value: name });
    const validationDetails = await validator.validate();

    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }

    const createRequest = toCreateApiArgs(request);
    const { id } = createRequest;

    await this.convex.mutation(api.apis.create, createRequest);

    const created = await this.convex.query(api.apis.find, { id });

    if (created == null) {
      throw new NotFoundError({ resource: `api with id ${id}` });
    }

    return toData({ data: toApi(created)});
  }
}
