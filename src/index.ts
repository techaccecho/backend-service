import { buildApp } from './app';

async function main(): Promise<void> {
  const app = await buildApp();

  try {
    const port = app.config.PORT;
    const host = app.config.NODE_ENV === 'prod' ? '0.0.0.0' : 'localhost';

    await app.listen({ port, host });

    app.log.info(`Server listening on ${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
