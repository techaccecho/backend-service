import { RequestData } from 'mediatr-ts';
import { type IdParam, IdParamSchema, type PostData } from '../../../lib';

export const GetPostParamSchema = IdParamSchema('The id of the post to fetch');

export class GetPostQuery extends RequestData<PostData> {
  constructor(public readonly request: IdParam) {
    super();
  }
}
