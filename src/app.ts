import Fastify from 'fastify';

export async function buildApp() {
  const app = Fastify({ logger: true });

  // Register Global Plugins
  await app.register(import('./plugins/config'));
  await app.register(import('./plugins/convex'));

  // Register Domain Modules
  await app.register(import('./modules/users/users.routes'), {
    prefix: '/v1/users',
  });

  return app;
}
