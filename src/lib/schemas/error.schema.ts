import { type Static, Type } from '@sinclair/typebox';
import type { FastifyError } from 'fastify';
import { DomainError, NotFoundError, ValidationError } from '../types';

export function isFastifyError(error: unknown): error is FastifyError {
  return (
    error !== null &&
    typeof error === 'object' &&
    ('code' in error || 'validation' in error || 'statusCode' in error)
  );
}

export const AppErrorSchema = Type.Object({
  code: Type.String(),
  message: Type.String(),
  stack: Type.Optional(Type.String()),
  details: Type.Optional(
    Type.Array(
      Type.Object({
        path: Type.String(),
        message: Type.String(),
      }),
    ),
  ),
  requestId: Type.String(),
});

export type AppError = Static<typeof AppErrorSchema>;

export type ToAppErrorArgs = {
  error: unknown;
  requestId: string;
  isProd: boolean;
};

export const toAppError = (args: ToAppErrorArgs): AppError => {
  const { error, requestId, isProd } = args;

  if (isFastifyError(error) && error.validation) {
    return {
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: error.validation.map((err) => ({
        path: err.instancePath,
        message: err.message ?? '',
      })),
      requestId,
    };
  }

  if (error instanceof ValidationError) {
    return {
      code: 'VALIDATION_ERROR',
      message: error.message,
      details: error.details,
      requestId,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      code: 'NOT_FOUND_ERROR',
      message: error.message,
      requestId,
    };
  }

  if (error instanceof DomainError) {
    return {
      code: 'INTERNAL_SERVER_ERROR',
      message: isProd ? 'Internal Server Error' : error.message,
      requestId,
    };
  }

  return {
    code: 'INTERNAL_SERVER_ERROR',
    message: isProd ? 'Internal Server Error' : (error as Error).message,
    ...(isProd ? {} : { stack: (error as Error).stack }),
    requestId,
  };
};
