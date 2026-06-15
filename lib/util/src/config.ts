import { type Static, Type } from '@sinclair/typebox';

export const ConfigSchema = Type.Object({
  NODE_ENV: Type.Union(
    [Type.Literal('dev'), Type.Literal('prod'), Type.Literal('test')],
    {
      default: 'dev',
    },
  ),
  PORT: Type.Number({ default: 3000 }),
  CONVEX_URL: Type.String(),
  LOG_LEVEL: Type.Union(
    [
      Type.Literal('info'),
      Type.Literal('verbose'),
      Type.Literal('debug'),
      Type.Literal('warn'),
      Type.Literal('error'),
    ],
    { default: 'error' },
  ),
  API_KEY: Type.String(),
  AUTH_JWKS_URI: Type.String(),
  AUTH_AUDIENCE: Type.String(),
  AUTH_ISSUER: Type.String(),
});

export type Config = Static<typeof ConfigSchema>;
