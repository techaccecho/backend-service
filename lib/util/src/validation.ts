import { api } from '@lib/data';
import type { ConvexHttpClient } from 'convex/browser';
import { inject, injectable } from 'tsyringe';
import type { ValidationDetail } from './error.js';
import { Tokens } from './token.js';

type AsyncValidatorFn = () => Promise<ValidationDetail | null>;

export type ValidationMode = 'parallel' | 'sequential' | 'fail-fast';

export type ValidatorArgs<T> = {
  path?: string;
  value: T;
};

type ValidateOptions = {
  mode?: ValidationMode;
};

export class AsyncValidator {
  private readonly validators: AsyncValidatorFn[] = [];

  constructor(private readonly convex: ConvexHttpClient) {}

  uniqueApiName(args: ValidatorArgs<string>): this {
    const { path = '/name', value } = args;

    this.validators.push(async () => {
      const exists = await this.convex.query(api.apis.findByName, {
        name: value,
      });

      if (exists != null) {
        return {
          path,
          message: `name '${value}' already exists`,
        };
      }

      return null;
    });

    return this;
  }

  uniqueAuthId(args: ValidatorArgs<string>): this {
    const { path = '/authId', value } = args;

    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByAuthId, {
        authId: value,
      });

      if (exists != null) {
        return {
          path,
          message: `authId '${value}' already exists`,
        };
      }

      return null;
    });

    return this;
  }

  uniqueAlias(args: ValidatorArgs<string>): this {
    const { path = '/alias', value } = args;

    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByAlias, {
        alias: value,
      });

      if (exists != null) {
        return {
          path,
          message: `alias '${value}' already exists`,
        };
      }

      return null;
    });

    return this;
  }

  uniqueEmail(args: ValidatorArgs<string>): this {
    const { path = '/email', value } = args;

    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByEmail, {
        email: value,
      });

      if (exists != null) {
        return {
          path,
          message: `email '${value}' already exists`,
        };
      }

      return null;
    });

    return this;
  }

  notEmpty(args: ValidatorArgs<Record<string, unknown>>): this {
    const { path = '/body', value } = args;

    this.validators.push(async () => {
      if (Object.keys(value).length === 0) {
        return {
          path,
          message: 'at least one property must be provided for update',
        };
      }

      return null;
    });

    return this;
  }

  async validate(options: ValidateOptions = {}): Promise<ValidationDetail[]> {
    const { mode = 'parallel' } = options;

    switch (mode) {
      case 'parallel': {
        const results = await Promise.all(this.validators.map((v) => v()));
        return results.filter((v): v is ValidationDetail => v !== null);
      }

      case 'sequential': {
        const errors: ValidationDetail[] = [];

        for (const validator of this.validators) {
          const result = await validator();
          if (result) {
            errors.push(result);
          }
        }

        return errors;
      }

      case 'fail-fast': {
        for (const validator of this.validators) {
          const result = await validator();
          if (result) {
            return [result];
          }
        }

        return [];
      }

      default:
        return [];
    }
  }
}

@injectable()
export class AsyncValidation {
  constructor(
    @inject(Tokens.ConvexClient) private readonly convex: ConvexHttpClient,
  ) {}

  validator(): AsyncValidator {
    return new AsyncValidator(this.convex);
  }
}
