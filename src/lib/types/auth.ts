export interface AuthUser {
  readonly id: string;
  readonly email: string;
}

export type Auth =
  | { readonly type: 'api' }
  | { readonly type: 'user'; readonly user: AuthUser };
