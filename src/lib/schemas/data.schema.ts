import { type TSchema, Type } from '@sinclair/typebox';
import type { PaginationResult } from 'convex/server';

/**
 * A generic wrapper for data.
 */
export const DataSchema = <T extends TSchema>(dataSchema: T) =>
  Type.Object({
    code: Type.String(),
    message: Type.String(),
    data: dataSchema,
  });

export type Data<T> = {
  code: string;
  message: string;
  data: T;
};

export type ToDataArgs<T> = {
  code?: string;
  message?: string;
  data: T;
};

/**
 * A generic wrapper for paginated data.
 */
export const PaginatedDataSchema = <T extends TSchema>(dataSchema: T) =>
  Type.Object({
    code: Type.String(),
    message: Type.String(),
    data: Type.Array(dataSchema),
    meta: Type.Object({
      nextCursor: Type.Union([Type.String(), Type.Null()]),
      hasMore: Type.Boolean(),
    }),
  });

export const toData = <T>(args: ToDataArgs<T>): Data<T> => {
  const { code = 'SUCCESS', message = 'Request succeeded', data } = args;

  return {
    code,
    message,
    data,
  };
};

export type PaginatedData<T> = {
  code: string;
  message: string;
  data: T[];
  meta: {
    nextCursor: string | null;
    hasMore: boolean;
  };
};

export type ToPaginatedDataArgs<TIn, TOut> = {
  code?: string;
  message?: string;
  result: PaginationResult<TIn>;
  mapper: (item: TIn) => TOut;
};

export const toPaginatedData = <TIn, TOut>(
  args: ToPaginatedDataArgs<TIn, TOut>,
): PaginatedData<TOut> => {
  const {
    code = 'SUCCESS',
    message = 'Request succeeded',
    result,
    mapper,
  } = args;

  return {
    code,
    message,
    data: result.page.map(mapper),
    meta: {
      nextCursor: result.continueCursor,
      hasMore: !result.isDone,
    },
  };
};
