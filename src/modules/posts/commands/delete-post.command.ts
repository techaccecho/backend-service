import { RequestData } from 'mediatr-ts';
import { type IdParam, IdParamSchema } from '../../../lib';

export const DeletePostParamSchema = IdParamSchema(
  'The id of the post to remove',
);

export class DeletePostCommand extends RequestData<void> {
  constructor(public readonly request: IdParam) {
    super();
  }
}
