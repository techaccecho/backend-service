import { serverless } from '@lib/starter';
import { buildApp } from '../apps/blog-service/dist/app/index.js';

export default async function handler(req, res) {
  const app = await buildApp();
  await serverless(app, req, res);
}
