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
