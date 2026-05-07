import 'dotenv/config';
import 'reflect-metadata';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import addFormats from 'ajv-formats';
import Fastify from 'fastify';
import {
  blogsRoutes,
  postsRoutes,
  threadsRoutes,
  usersRoutes,
} from './modules';
import {
  configPlugin,
  convexPlugin,
  errorHandlerPlugin,
  mediatorPlugin,
} from './plugins';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      redact: ['req.headers.authorization', 'body.password', 'body.email'],
      serializers: {
        req: (req) => ({ method: req.method, url: req.url, ip: req.ip }),
      },
    },
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
        allErrors: true,
      },
      plugins: [(ajv) => addFormats(ajv, { mode: 'full' })],
    },
  }).withTypeProvider<TypeBoxTypeProvider>(); // Sets global type inference'

  // Global Plugins
  await app.register(configPlugin);
  await app.register(convexPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(mediatorPlugin);

  // Swagger
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Backend Service API',
        description: 'Documentation of the Backend Service',
        version: '1.0.0',
      },
    },
  });

  // Swagger UI
  await app.register(swaggerUi, {
    routePrefix: '/api/documentation',
  });

  // Domain Modules
  await app.register(usersRoutes, {
    prefix: '/api/v1/users',
  });
  await app.register(postsRoutes, {
    prefix: '/api/v1/posts',
  });
  await app.register(blogsRoutes, {
    prefix: '/api/v1/blogs',
  });
  await app.register(threadsRoutes, {
    prefix: '/api/v1/threads',
  });

  return app;
}
