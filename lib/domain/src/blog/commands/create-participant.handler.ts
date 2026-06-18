import { api } from '@lib/data';
import { NotFoundError, toData, Tokens } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import type { FastifyBaseLogger } from 'fastify';
import { type RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { CreateParticipantCommand, toCreateParticipantArgs } from './create-participant.command.js';
import { BlogData, toBlog } from '../blog.schema.js';

@injectable()
@requestHandler(CreateParticipantCommand)
export class CreateParticipantHandler
  implements RequestHandler<CreateParticipantCommand, BlogData>
{
  constructor(
    @inject(Tokens.Logger) private readonly logger: FastifyBaseLogger,
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  async handle(command: CreateParticipantCommand): Promise<BlogData> {
    const { request } = command;
    const { params, user } = request;
    const { blogId } = params;
    const { email } = user;

    this.logger.info({ email }, `Creating participant: ${email}`);

    const args = toCreateParticipantArgs(request);

    const updated = await this.convex.mutation(api.blogs.update, args);

    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    return toData({ data: toBlog(updated)});
  }
}
