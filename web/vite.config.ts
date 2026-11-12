import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// The Vite root stays in /web, but Lane A's read-only API lives in /lib
// and internally imports /data. The dev server must permit both.
const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));

export default defineConfig({
  base: './',
  server: {
    fs: { allow: [repositoryRoot] },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
