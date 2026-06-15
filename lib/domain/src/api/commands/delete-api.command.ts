import type { Doc } from '@lib/data';
import { RequestData } from 'mediatr-ts';
import { type Static, Type } from '@sinclair/typebox';

export const DeleteApiParamsSchema = Type.Object({
  apiId: Type.String({
    description: 'The id of the api',
    format: 'uuid',
  }),
});

export type DeleteApiParams = Static<typeof DeleteApiParamsSchema>;

export type DeleteApiRequest = {
  params: DeleteApiParams,
  existing: Doc<'apis'>;
};

export class DeleteApiCommand extends RequestData<void> {
  constructor(public readonly request: DeleteApiRequest) {
    super();
  }
}
