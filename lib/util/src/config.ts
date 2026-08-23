import { type Static, Type } from '@sinclair/typebox';

export const ConfigSchema = Type.Object({
  NODE_ENV: Type.Union(
    [
      Type.Literal('dev'),
      Type.Literal('development'),
      Type.Literal('prod'),
      Type.Literal('production'),
      Type.Literal('test'),
      Type.Literal('preview'),
    ],
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
      Type.Literal('fatal'),
      Type.Literal('trace'),
      Type.Literal('silent'),
    ],
    { default: 'error' },
  ),
  API_KEY: Type.String(),
  AUTH_DOMAIN: Type.String(),
  AUTH_CLIENT_ID: Type.String(),
  AUTH_CLIENT_SECRET: Type.String(),
  VERCEL_PROXY_SECRET: Type.Optional(Type.String()),
});

export type Config = Static<typeof ConfigSchema>;
