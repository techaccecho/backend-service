import { serverless } from '@lib/starter';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildApp } from './app.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await buildApp();
  await serverless(app, req, res);
}
