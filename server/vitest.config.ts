import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals:     true,
    coverage: {
      provider:  'v8',
      reporter:  ['text', 'json', 'html'],
      include:   ['src/**'],
      exclude:   ['src/types/**', 'src/server.ts', 'src/data/**', 'src/**/*.d.ts'],
      thresholds: { lines: 70, functions: 70, branches: 70 },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
});
