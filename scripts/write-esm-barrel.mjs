import { readFile, writeFile } from 'node:fs/promises';

const source = await readFile('src/components/loaders/index.ts', 'utf8');
const componentExports = [...source.matchAll(/export \{ ([A-Za-z0-9]+) \} from '\.\/([A-Za-z0-9]+)';/g)];
const unique = new Map(componentExports.map((match) => [match[1], match[2]]));

const lines = [
  "'use client';",
  ...[...unique].map(([exportName, fileName]) =>
    `export { ${exportName} } from './loaders/${fileName}.js';`
  ),
  "export { LOADER_SIZES, LOADER_BG_VARIANTS, LOADER_BORDER_VARIANTS, resolveColor, resolveColorStyle, resolveSizeClass } from './shared.js';",
  "export { CURATED_LOADER_NAMES, CURATED_LOADER_COUNT } from './catalog.js';",
  '',
];

await writeFile('dist/index.js', lines.join('\n'));
await writeFile(
  'dist/tailwind-preset.d.cts',
  "import type { Config } from 'tailwindcss';\ndeclare const loaderPreset: Partial<Config>;\nexport = loaderPreset;\n"
);
console.log(`Wrote tree-shakeable ESM barrel with ${unique.size} compatible loader exports.`);
