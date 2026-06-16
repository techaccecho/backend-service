import { server } from '@lib/starter';
import { buildApp } from './app/index.js';

const app = await buildApp();
await server(app);