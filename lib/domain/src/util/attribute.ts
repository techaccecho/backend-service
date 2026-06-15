import { type Static, Type } from '@sinclair/typebox';
import type {
  AttributeEntity,
} from '@lib/data';
import { toISO } from '@lib/util';

export const AttributeSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  value: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});

export type Attribute = Static<typeof AttributeSchema>;

export const toAttribute = (request: AttributeEntity): Attribute => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});