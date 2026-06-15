import { type Static, Type } from '@sinclair/typebox';

export const IdParamSchema = (description?: string) =>
  Type.Object({
    id: Type.String({
      description: description ?? 'The Id',
      format: 'uuid',
    }),
  });

const StaticIdParamSchema = Type.Object({
  id: Type.String({
    description: 'The Id',
    format: 'uui',
  }),
});

export type IdParam = Static<typeof StaticIdParamSchema>;

export const assertIdParam: (params: unknown) => asserts params is IdParam = (
  params,
) => {
  if (
    typeof params !== 'object' ||
    params === null ||
    !('id' in params && typeof params.id === 'string')
  ) {
    throw new Error(`Invalid idParam: ${params}`);
  }
};
