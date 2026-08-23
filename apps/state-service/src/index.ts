import { buildApp } from './app/index.js';

const app = await buildApp();
const port = parseInt(process.env.PORT || '3004', 10);
const host = process.env.HOST || '0.0.0.0';

try {
  await app.listen({ port, host });
  app.log.info(`ARG State Service running on http://${host}:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
