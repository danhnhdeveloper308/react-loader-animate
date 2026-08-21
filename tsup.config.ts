import { defineConfig } from 'tsup';
import { readdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const loadersDirectory = join(process.cwd(), 'src/components/loaders');
const loaderEntries = Object.fromEntries(
  readdirSync(loadersDirectory)
    .filter((file) => file.endsWith('Loader.tsx') || file === 'GradientSpinner.tsx' || file === 'SandTimer.tsx')
    .map((file) => [`loaders/${basename(file, '.tsx')}`, join(loadersDirectory, file)])
);

export default defineConfig({
  tsconfig: 'tsconfig.lib.json',
  entry: {
    index: 'src/lib/index.ts',
    catalog: 'src/components/loaders/catalog.ts',
    shared: 'src/components/loaders/types.ts',
    'tailwind-preset': 'tailwind.preset.ts',
    ...loaderEntries,
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  splitting: false,
  sourcemap: false,
  minify: true,
  treeshake: true,
  outDir: 'dist',
  target: 'es2020',
  // The classic transform avoids strict Node ESM resolution failures for
  // react/jsx-runtime on React 16/17. React is injected at build time so source
  // components remain concise and the peer dependency is never bundled.
  esbuildOptions(options) {
    options.jsx = 'transform';
    options.jsxFactory = 'React.createElement';
    options.jsxFragment = 'React.Fragment';
    options.inject = [join(process.cwd(), 'scripts/react-inject.ts')];
  },
  // Required for Next.js App Router & React Server Components compatibility
  banner: {
    js: '"use client";',
  },
});
