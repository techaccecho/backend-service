import { type Static, Type } from '@sinclair/typebox';
import type { FastifyError } from 'fastify';

export type ForbiddenErrorArgs = {
  message?: string;
};

export type DomainErrorArgs = {
  code?: string;
  message: string;
};

/**
 * Base class for all domain-specific errors.
 */
export class DomainError extends Error {
  public readonly code: string;

  constructor(args: DomainErrorArgs) {
    const { message, code = 'DOMAIN_ERROR' } = args;
    super(message);

    this.name = this.constructor.name;
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export type NotFoundErrorArgs = {
  code?: string;
  resource?: string;
};

export class NotFoundError extends DomainError {
  constructor(args: NotFoundErrorArgs = {}) {
    const { code = 'NOT_FOUND', resource = 'Resource' } = args;
    const message = `${resource} not found`;
    super({ code, message });
  }
}

export type UnauthorizedErrorArgs = {
  message?: string;
};

export class UnauthorizedError extends DomainError {
  constructor(args: UnauthorizedErrorArgs = {}) {
    const { message = 'Unauthorized access' } = args;
    const code = 'UNAUTHORIZED';
    super({ code, message });
  }
}

export type ValidationDetail = {
  path: string;
  message: string;
};

export type ValidationErrorArgs = {
  message?: string;
  details?: ValidationDetail[];
};

export class ValidationError extends DomainError {
  details: ValidationDetail[];

  constructor(args: ValidationErrorArgs) {
    const { message = 'Validation failed', details = [] } = args;
    const code = 'VALIDATION_FAILED';
    super({ code, message });
    this.details = details;
  }
}

export class ForbiddenError extends DomainError {
  constructor(args: ForbiddenErrorArgs = {}) {
    const { message = 'Forbidden access' } = args;
    const code = 'FORBIDDEN';
    super({ code, message });
  }
}

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

  if (error instanceof UnauthorizedError) {
    return {
      code: 'UNAUTHORIZED_ERROR',
      message: error.message,
      requestId,
    };
  }

  if (error instanceof ForbiddenError) {
    return {
      code: 'FORBIDDEN_ERROR',
      message: error.message,
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
