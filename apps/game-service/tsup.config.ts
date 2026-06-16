import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/api/index.ts'],
  outDir: 'api',
  format: ['esm'],
  dts: false,
  tsconfig: 'tsconfig.json',
  clean: true,
  noExternal: [
    '@lib/data',
    '@lib/util',
    '@lib/domain',
    '@lib/starter'
  ]
});