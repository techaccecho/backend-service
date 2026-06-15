import { server } from '@lib/starter';
import { buildApp } from './app.js';

export default async function main() {
  const app = await buildApp();
  await server(app);
}
