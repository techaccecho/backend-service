import { server } from '@lib/starter';
import { buildApp } from './app';

export default async function main() {
  const app = await buildApp();
  await server(app);
}
