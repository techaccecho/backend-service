import { type Static, Type } from '@sinclair/typebox';
import type { PaginationOptions } from 'convex/server';

export const QuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Number of items to fetch',
    }),
  ),
  cursor: Type.Optional(
    Type.Union([Type.Null(), Type.String()], {
      default: null,
      description: 'The cursor/token for the next set of results',
    }),
  ),
  sort: Type.Optional(
    Type.Union([Type.Literal('asc'), Type.Literal('desc')], {
      description: 'Sort direction',
    }),
  ),
  search: Type.Optional(
    Type.String({
      description: 'Search term for matching posts/threads',
    }),
  ),
});

export type Query = Static<typeof QuerySchema>;

export const toQuery = (query: Query): PaginationOptions => ({
  numItems: query.limit ?? 20,
  cursor: query.cursor ?? null,
});
