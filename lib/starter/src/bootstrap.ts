import 'dotenv/config';
import 'reflect-metadata';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import addFormats from 'ajv-formats';
import Fastify, {
  type FastifyBaseLogger,
  type FastifyInstance,
  type RawReplyDefaultExpression,
  type RawRequestDefaultExpression,
  type RawServerDefault,
} from 'fastify';
import {
  authPlugin,
  configPlugin,
  convexPlugin,
  errorHandlerPlugin,
  mediatorPlugin,
  routesPlugin,
} from './plugins/index.js';

export type FastifyApp = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export type BootstrapConfig = {
  routePrefix: string;
  docs: {
    title: string;
    description: string;
    version: string;
  };
};

export const bootstrap = async (config: BootstrapConfig) => {
  const { routePrefix, docs } = config;

  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',

      transport:
        process.env.NODE_ENV !== 'prod'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'body.password',
          'body.token',
          'body.accessToken',
          'body.refreshToken',
          'body.token',
          'body.secret',
          'body.apiKey',
        ],
        censor: '[REDACTED]',
      },
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
      plugins: [(ajv) => addFormats.default(ajv, { mode: 'full' })],
    },
  }).withTypeProvider<TypeBoxTypeProvider>(); // Sets global type inference'

  // Global Plugins
  await app.register(configPlugin);
  await app.register(convexPlugin);
  await app.register(mediatorPlugin);
  await app.register(authPlugin);
  await app.register(errorHandlerPlugin);

  // Swagger
  await app.register(swagger, {
    openapi: {
      info: {
        title: docs.title,
        description: docs.description,
        version: docs.version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter your JWT access Token',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });

  // Swagger UI
  await app.register(swaggerUi, {
    routePrefix: `${routePrefix}/docs`,
  });

  // Cors
  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Routes
  await app.register(routesPlugin, { routePrefix });

  return app;
};

export const server = async (app: FastifyInstance) => {
  try {
    const port = app.config.PORT;
    const host = app.config.NODE_ENV !== 'prod' ? 'localhost' : '0.0.0.0';

    await app.listen({ port, host });

    app.log.info(`Server listening on ${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

export const serverless = async (
  app: FastifyInstance,
  req: VercelRequest,
  res: VercelResponse,
) => {
  await app.ready();
  app.server.emit('request', req, res);
};
