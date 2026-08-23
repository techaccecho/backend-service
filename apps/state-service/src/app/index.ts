import { bootstrap } from '@lib/starter';
import { stateRoutes } from '../modules/state/state.routes.js';

export async function buildApp() {
  const app = await bootstrap({
    routePrefix: '/state-api',
    docs: {
      title: 'ARG State Service',
      description: 'Documentation of the ARG State & Progress Sync Service',
      version: '1.0.0',
    },
  });

  await app.register(stateRoutes, { prefix: '/state-api' });

  return app;
}
