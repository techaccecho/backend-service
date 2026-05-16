import awsLambdaFastify from '@fastify/aws-lambda';
import { buildApp } from '../dist/app.js';

let proxy;

export default async function handler(req, res) {
  if (!proxy) {
    const app = await buildApp();
    await app.ready();
    proxy = awsLambdaFastify(app);
  }

  return proxy(req, res);
}
