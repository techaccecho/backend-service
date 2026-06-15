import { bootstrap } from '@lib/starter';

export async function buildApp() {
  const app = await bootstrap({
    routePrefix: '/blog-api',
    docs: {
      title: 'Blog Service',
      description: 'Documentation of the Blog Service',
      version: '1.0.0'
    },
  });

  return app;
}
