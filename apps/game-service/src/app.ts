import { bootstrap } from '@lib/starter';

export async function buildApp() {
  const app = await bootstrap({
    routePrefix: '/api',
    docs: {
      title: 'Game Service',
      description: 'Documentation of the Game Service',
      version: '1.0.0',
    },
  });

  return app;
}
