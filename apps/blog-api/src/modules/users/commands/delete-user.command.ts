import { RequestData } from 'mediatr-ts';
import { type IdParam, IdParamSchema } from '../../../lib';

export const DeleteUserParamSchema = IdParamSchema(
  'The id of the user to remove',
);

export class DeleteUserCommand extends RequestData<void> {
  constructor(public readonly request: IdParam) {
    super();
  }
}
