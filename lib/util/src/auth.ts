import type { Doc } from '@lib/data';

export type Auth =
  | { readonly type: 'api' }
  | { readonly type: 'user'; readonly user: Doc<'users'> };

export const assertAuth: (auth?: Auth | null) => asserts auth is Auth = (
  post,
) => {
  if (post == null) {
    throw new Error('auth is null/undefined');
  }
};
