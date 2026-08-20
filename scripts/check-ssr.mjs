import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readdir } from 'node:fs/promises';

const loaderNames = (await readdir(new URL('../dist/loaders/', import.meta.url)))
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.slice(0, -3));

for (const name of loaderNames) {
  const module = await import(`../dist/loaders/${name}.js`);
  const Component = module[name];
  if (typeof Component !== 'function' && typeof Component !== 'object') {
    throw new Error(`${name}: invalid component export`);
  }

  const html = renderToStaticMarkup(createElement(Component, {
    ariaLabel: `Loading ${name}`,
    color: '#123abc',
  }));
  if (!html.includes('role="status"') || !html.includes(`Loading ${name}`)) {
    throw new Error(`${name}: missing SSR status semantics`);
  }
  if (!html.toLowerCase().includes('#123abc')) {
    throw new Error(`${name}: custom color is absent from SSR output`);
  }
  if (renderToStaticMarkup(createElement(Component, { visible: false })) !== '') {
    throw new Error(`${name}: visible=false must render nothing`);
  }
}

console.log(`SSR-rendered ${loaderNames.length} public loaders with accessibility, color and visibility assertions.`);
