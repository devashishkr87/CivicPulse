import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals:     true,
    setupFiles:  ['./tests/setup.ts'],
    include:     ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    css:         false,
    coverage: {
      provider:  'v8',
      reporter:  ['text', 'json', 'html'],
      include:   ['src/**'],
      exclude:   ['src/types/**', 'src/main.tsx', 'src/**/*.d.ts'],
      thresholds: { lines: 70, functions: 70, branches: 70 },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
});
