import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';

const cases = [
  {
    label: 'root named import',
    source: "import { SpinLoader } from 'react-loader-animate'; export { SpinLoader };",
    budget: 2_800,
  },
  {
    label: 'loader subpath',
    source: "export { SpinLoader } from 'react-loader-animate/loaders/SpinLoader';",
    budget: 2_800,
  },
];

let failed = false;
for (const entry of cases) {
  const result = await build({
    stdin: { contents: entry.source, resolveDir: process.cwd(), loader: 'js' },
    bundle: true,
    minify: true,
    write: false,
    format: 'esm',
    platform: 'browser',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    logLevel: 'silent',
  });
  const raw = result.outputFiles[0].contents;
  const gzip = gzipSync(raw).byteLength;
  console.log(`${entry.label}: ${raw.byteLength} B minified / ${gzip} B gzip`);
  if (gzip > entry.budget) {
    failed = true;
    console.error(`${entry.label} exceeds the ${entry.budget} B gzip budget.`);
  }
}

if (failed) process.exitCode = 1;
