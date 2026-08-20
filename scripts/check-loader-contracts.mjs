import { readFile, readdir } from 'node:fs/promises';

const catalogSource = await readFile('src/components/loaders/catalog.ts', 'utf8');
const stylesheet = await readFile('src/lib/styles.css', 'utf8');
const names = [...catalogSource.matchAll(/'([A-Za-z0-9]+)'/g)].map((match) => match[1]);
const publicLoaderNames = (await readdir('src/components/loaders'))
  .filter((file) => file.endsWith('Loader.tsx') || file === 'GradientSpinner.tsx' || file === 'SandTimer.tsx')
  .map((file) => file.slice(0, -4));
const failures = [];

if (names.length < 99 || names.length > 120 || new Set(names).size !== names.length) {
  failures.push(`catalog must contain 99–120 unique loaders; received ${names.length}`);
}

for (const name of publicLoaderNames) {
  const source = await readFile(`src/components/loaders/${name}.tsx`, 'utf8');
  const requirements = [
    ['status semantics', /role="status"/],
    ['accessible label', /aria-label=/],
    ['visible prop', /\bvisible\b/],
    ['custom color support', /resolveColor(?:Style)?\(/],
  ];

  for (const [label, pattern] of requirements) {
    if (!pattern.test(source)) failures.push(`${name}: missing ${label}`);
  }

  if (/Math\.random|setInterval|setTimeout|requestAnimationFrame|useEffect|useState/.test(source)) {
    failures.push(`${name}: contains non-deterministic or stateful animation runtime`);
  }
  if (/document\.|window\.|createElement\(['"]style/.test(source)) {
    failures.push(`${name}: contains a browser or runtime style side effect`);
  }

  const animationNames = [
    ...source.matchAll(/animation(?:Name)?\s*:\s*[^,\n}]*?\b(rla-[A-Za-z0-9_-]+)\b/g),
  ].map((match) => match[1]);
  for (const animationName of new Set(animationNames)) {
    if (
      !stylesheet.includes(`@keyframes ${animationName}`) &&
      !stylesheet.includes(`.${animationName}`) &&
      !stylesheet.includes(`--${animationName}`)
    ) {
      failures.push(`${name}: missing static keyframes for ${animationName}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${publicLoaderNames.length} public loaders; ${names.length} are in the curated catalog.`
  );
}
