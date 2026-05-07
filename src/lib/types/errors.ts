export type DomainErrorArgs = {
  code?: string;
  message: string;
};

export type NotFoundErrorArgs = {
  code?: string;
  resource?: string;
};

export type UnauthorizedErrorArgs = {
  message?: string;
};

export type ValidationDetail = {
  path: string;
  message: string;
};

export type ValidationErrorArgs = {
  message?: string;
  details?: ValidationDetail[];
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

export class NotFoundError extends DomainError {
  constructor(args: NotFoundErrorArgs) {
    const { code = 'NOT_FOUND', resource = 'Resource' } = args;
    const message = `${resource} not found`;
    super({ code, message });
  }
}

export class UnauthorizedError extends DomainError {
  constructor(args: UnauthorizedErrorArgs) {
    const { message = 'Unauthorized access' } = args;
    const code = 'UNAUTHORIZED';
    super({ code, message });
  }
}

export class ValidationError extends DomainError {
  details: ValidationDetail[];

  constructor(args: ValidationErrorArgs) {
    const { message = 'Validation failed', details = [] } = args;
    const code = 'VALIDATION_FAILED';
    super({ code, message });
    this.details = details;
  }
}
