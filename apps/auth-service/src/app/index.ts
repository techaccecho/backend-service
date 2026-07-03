import { bootstrap } from '@lib/starter';

export async function buildApp() {
  const app = await bootstrap({
    routePrefix: '/auth-api',
    docs: {
      title: 'Auth Service',
      description: 'Documentation of the Auth Service',
      version: '1.0.0',
    },
  });

  return app;
}
