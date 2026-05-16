import { buildApp } from '../dist/app.js';

export default async function handler(req, res) {
  const app = await buildApp();
  await app.ready();

  app.server.emit('request', req, res);
}