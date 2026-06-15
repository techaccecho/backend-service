import { bootstrap } from '@lib/starter';
import { routesPlugin } from './plugins/index.js';

export async function buildApp() {
  const app = await bootstrap({
    routePrefix: '/api',
    docs: {
      title: 'Blog Service',
      description: 'Documentation of the Blog Service',
      version: '1.0.0'
    },
  });

  await app.register(routesPlugin);

  return app;
}
