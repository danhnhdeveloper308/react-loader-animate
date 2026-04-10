import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // types are generated separately via: tsc --project tsconfig.lib.json
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  splitting: false,
  sourcemap: false,
  minify: false,
  treeshake: true,
  outDir: 'dist',
  target: 'es2020',
  // Use React 17+ automatic JSX runtime (no need to import React in every file)
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  // Required for Next.js App Router & React Server Components compatibility
  banner: {
    js: '"use client";',
  },
});
