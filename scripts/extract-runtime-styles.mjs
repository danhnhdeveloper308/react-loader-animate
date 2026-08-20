import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const directory = 'src/components/loaders';
const files = (await readdir(directory)).filter((file) => file.endsWith('.tsx'));
const candidates = [];

for (const file of files) {
  const filePath = path.join(directory, file);
  const source = await readFile(filePath, 'utf8');
  if (!source.includes('document.head.appendChild')) continue;

  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const injector = ast.statements.find((node) =>
    ts.isFunctionDeclaration(node) && node.body?.getText(ast).includes('document.head.appendChild')
  );
  if (!injector || !injector.name || !injector.body) {
    throw new Error(`Unable to locate the style injector in ${file}`);
  }

  let cssExpression;
  const visitBody = (node) => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.name.text === 'textContent'
    ) cssExpression = node.right;
    ts.forEachChild(node, visitBody);
  };
  visitBody(injector.body);

  const variables = ast.statements.filter(ts.isVariableStatement);
  let css;
  let cssVariable;
  if (cssExpression && (ts.isNoSubstitutionTemplateLiteral(cssExpression) || ts.isStringLiteral(cssExpression))) {
    css = cssExpression.text;
  } else if (cssExpression && ts.isIdentifier(cssExpression)) {
    cssVariable = cssExpression.text;
    for (const statement of variables) {
      const declaration = statement.declarationList.declarations.find(
        (item) => ts.isIdentifier(item.name) && item.name.text === cssVariable
      );
      if (declaration?.initializer && (
        ts.isNoSubstitutionTemplateLiteral(declaration.initializer) || ts.isStringLiteral(declaration.initializer)
      )) css = declaration.initializer.text;
    }
  }
  if (!css) throw new Error(`Unable to extract static keyframes from ${file}`);

  const injectorText = injector.getText(ast);
  const ranges = [{ start: injector.getFullStart(), end: injector.end }];
  for (const statement of variables) {
    const names = statement.declarationList.declarations
      .map((item) => ts.isIdentifier(item.name) ? item.name.text : '')
      .filter(Boolean);
    if (names.includes(cssVariable) || names.some((name) => injectorText.includes(name))) {
      ranges.push({ start: statement.getFullStart(), end: statement.end });
    }
  }

  const findCalls = (node) => {
    if (
      ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
      node.expression.text === injector.name.text
    ) ranges.push({ start: node.getStart(ast), end: node.end });
    ts.forEachChild(node, findCalls);
  };
  findCalls(ast);

  let nextSource = source;
  for (const range of ranges.sort((a, b) => b.start - a.start)) {
    nextSource = nextSource.slice(0, range.start) + nextSource.slice(range.end);
  }
  candidates.push({ filePath, source: nextSource, css });
}

if (candidates.length === 0) {
  console.log('No runtime style injectors found.');
  process.exit(0);
}

const marker = '/* Extracted loader keyframes — generated from component definitions. */';
let stylesheet = await readFile('src/lib/styles.css', 'utf8');
if (stylesheet.includes(marker)) {
  throw new Error('The extracted keyframe block already exists.');
}

for (const candidate of candidates) {
  await writeFile(candidate.filePath, candidate.source);
}

stylesheet += `\n\n${marker}\n${candidates.map(({ css }) => css).join('\n')}\n`;
await writeFile('src/lib/styles.css', stylesheet);
console.log(`Moved ${candidates.length} runtime style injectors into the static stylesheet.`);
