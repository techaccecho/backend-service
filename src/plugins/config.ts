import fastifyEnv from '@fastify/env';
import fp from 'fastify-plugin';
import { ConfigSchema } from '../lib';

export const configPlugin = fp(
  async (fastify) => {
    const options = {
      confKey: 'config',
      schema: ConfigSchema,
      dotenv: true, // Look for .env files
      data: process.env, // Merge process.env with the validated file data
    };

    return fastify.register(fastifyEnv, options);
  },
  { name: 'config' },
);
