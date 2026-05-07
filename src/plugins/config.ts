import fastifyEnv from '@fastify/env';
import { type Static, Type } from '@sinclair/typebox';
import fp from 'fastify-plugin';

// Define the Schema using TypeBox
export const ConfigSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('dev'), Type.Literal('prod')], {
    default: 'dev',
  }),
  PORT: Type.Number({ default: 3000 }),
  CONVEX_URL: Type.String(),
});

// Derive the TypeScript type from the schema
export type Env = Static<typeof ConfigSchema>;

export default fp(
  async (fastify) => {
    const options = {
      confKey: 'config',
      schema: ConfigSchema,
      dotenv: true, // Tells the plugin to look for .env files
      data: process.env, // Merges process.env with the validated file data
    };

    return fastify.register(fastifyEnv, options);
  },
  {
    name: 'config', // Helps with debugging and loading order
  },
);
