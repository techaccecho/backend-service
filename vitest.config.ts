import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Allows using 'describe' and 'it' without importing them
    environment: 'node',
    alias: {
      // Helps Vitest find generated Convex files
      '../../convex/_generated': './convex/_generated',
    },
    // Ensures .env.local isn't loaded during tests
    env: {
      NODE_ENV: 'test',
      CONVEX_URL: 'http://mock-convex.local',
    },
  },
});
