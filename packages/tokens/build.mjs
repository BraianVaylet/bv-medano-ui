/**
 * Compilador de tokens medano.
 *
 * Lee la fuente W3C DTCG (src/*.tokens.json) y emite:
 *   dist/vars.css            → CSS custom properties (dark por defecto, light derivado)
 *   dist/theme.css           → preset Tailwind v4 (@theme inline)
 *   dist/index.js + .d.ts    → objetos tipados con los valores resueltos
 *   dist/native/tokens.json  → valores para React Native (oklch → hex, rem → número)
 *
 * Se eligió un compilador propio en lugar de Style Dictionary para mantener el
 * pipeline transparente y sin dependencias de runtime; la fuente sigue siendo
 * DTCG estándar, así que migrar a otra herramienta no requiere tocar los tokens.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse, rgb } from 'culori';

const PKG_DIR = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(PKG_DIR, 'src');
const DIST_DIR = join(PKG_DIR, 'dist');

const VAR_PREFIX = '--medano-';
const REM_IN_PX = 16;

/** Prefijos de path renombrados para nombres de variable más ergonómicos. */
const PATH_RENAMES = [
  ['motion.duration.', 'duration.'],
  ['motion.ease.', 'ease.'],
  ['font.family.', 'font.'],
  ['font.size.', 'text.'],
  ['font.weight.', 'weight.'],
  ['font.leading.', 'leading.'],
  ['font.tracking.', 'tracking.'],
];

/** Aplana un árbol DTCG a una lista de tokens { path, value, type }. */
export function flattenTokens(node, path = [], inheritedType = undefined) {
  const type = node.$type ?? inheritedType;
  if (Object.hasOwn(node, '$value')) {
    return [{ path: path.join('.'), value: node.$value, type }];
  }
  const tokens = [];
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    tokens.push(...flattenTokens(child, [...path, key], type));
  }
  return tokens;
}

const ALIAS_PATTERN = /^\{([^}]+)\}$/;

/** Resuelve aliases {a.b.c} contra el diccionario dado. Detecta ciclos. */
export function resolveAlias(value, lookup, seen = new Set()) {
  if (typeof value !== 'string') return value;
  const match = value.match(ALIAS_PATTERN);
  if (!match) return value;
  const target = match[1];
  if (seen.has(target)) {
    throw new Error(`Alias circular: ${[...seen, target].join(' -> ')}`);
  }
  if (!Object.hasOwn(lookup, target)) {
    throw new Error(`Alias sin destino: {${target}}`);
  }
  return resolveAlias(lookup[target], lookup, new Set([...seen, target]));
}

/** Convierte el path DTCG en nombre de variable CSS (--medano-…). */
export function toVarName(tokenPath) {
  let renamed = tokenPath;
  for (const [from, to] of PATH_RENAMES) {
    if (renamed.startsWith(from)) {
      renamed = to + renamed.slice(from.length);
      break;
    }
  }
  return VAR_PREFIX + renamed.replaceAll('.', '-');
}

/** Serializa el valor de un token a CSS. */
export function toCssValue(token) {
  const { value, type } = token;
  if (type === 'cubicBezier') {
    return `cubic-bezier(${value.join(', ')})`;
  }
  if (type === 'fontFamily') {
    return value.map((name) => (name.includes(' ') ? `'${name}'` : name)).join(', ');
  }
  return String(value);
}

function readTokenFile(fileName) {
  return JSON.parse(readFileSync(join(SRC_DIR, fileName), 'utf8'));
}

/** Carga y resuelve todo. Devuelve { core, dark, light } como listas de tokens resueltos. */
export function loadTokens() {
  const core = flattenTokens(readTokenFile('core.tokens.json'));
  const lookup = Object.fromEntries(core.map((token) => [token.path, token.value]));

  const resolveTheme = (fileName) =>
    flattenTokens(readTokenFile(fileName)).map((token) => ({
      ...token,
      value: resolveAlias(token.value, lookup),
    }));

  return {
    core,
    dark: resolveTheme('semantic.dark.tokens.json'),
    light: resolveTheme('semantic.light.tokens.json'),
  };
}

function declarations(tokens, indent) {
  return tokens
    .map((token) => `${indent}${toVarName(token.path)}: ${toCssValue(token)};`)
    .join('\n');
}

export function buildVarsCss({ core, dark, light }) {
  const lightBlock = declarations(light, '    ');
  return `/* Generado por build.mjs — no editar a mano. Fuente: src/*.tokens.json */

:root {
  color-scheme: dark;
${declarations(core, '  ')}
${declarations(dark, '  ')}
}

[data-theme='light'] {
  color-scheme: light;
${declarations(light, '  ')}
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    color-scheme: light;
${lightBlock}
  }
}
`;
}

/**
 * Preset Tailwind v4. `@theme inline` porque los valores referencian variables
 * que cambian con el tema; los breakpoints van literales (las media queries no
 * pueden usar var()).
 */
export function buildThemeCss({ core, dark }) {
  const lines = [];
  const ref = (path) => `var(${toVarName(path)})`;

  for (const token of dark) {
    const name = token.path.replaceAll('.', '-');
    if (token.path.startsWith('surface.')) lines.push(`  --color-${name}: ${ref(token.path)};`);
    else if (token.path.startsWith('ink.')) lines.push(`  --color-${name}: ${ref(token.path)};`);
    else if (token.path === 'accent.base') lines.push(`  --color-accent: ${ref(token.path)};`);
    else if (token.path.startsWith('accent.'))
      lines.push(`  --color-accent-${token.path.split('.')[1]}: ${ref(token.path)};`);
    else if (token.path.startsWith('feedback.'))
      lines.push(`  --color-${token.path.split('.')[1]}: ${ref(token.path)};`);
    else if (token.path === 'border.subtle') lines.push(`  --color-line: ${ref(token.path)};`);
    else if (token.path === 'border.strong')
      lines.push(`  --color-line-strong: ${ref(token.path)};`);
    else if (token.path === 'border.focus') lines.push(`  --color-focus: ${ref(token.path)};`);
    else if (token.path.startsWith('halo.')) lines.push(`  --shadow-${name}: ${ref(token.path)};`);
    else if (token.path === 'scrim.base') lines.push(`  --color-scrim: ${ref(token.path)};`);
  }

  for (const token of core) {
    const [group, ...rest] = token.path.split('.');
    const tail = rest.join('-');
    if (token.path.startsWith('font.family.'))
      lines.push(`  --font-${tail.replace('family-', '')}: ${ref(token.path)};`);
    else if (token.path.startsWith('font.size.'))
      lines.push(`  --text-${rest[1]}: ${ref(token.path)};`);
    else if (token.path.startsWith('font.weight.'))
      lines.push(`  --font-weight-${rest[1]}: ${ref(token.path)};`);
    else if (token.path.startsWith('font.leading.'))
      lines.push(`  --leading-${rest[1]}: ${ref(token.path)};`);
    else if (token.path.startsWith('font.tracking.'))
      lines.push(`  --tracking-${rest[1]}: ${ref(token.path)};`);
    else if (group === 'space') lines.push(`  --spacing-${tail}: ${ref(token.path)};`);
    else if (group === 'radius') lines.push(`  --radius-${tail}: ${ref(token.path)};`);
    else if (token.path.startsWith('motion.ease.'))
      lines.push(`  --ease-${rest[1]}: ${ref(token.path)};`);
  }

  const breakpoints = core
    .filter((token) => token.path.startsWith('breakpoint.'))
    .map((token) => `  --breakpoint-${token.path.split('.')[1]}: ${toCssValue(token)};`)
    .join('\n');

  return `/* Generado por build.mjs — preset Tailwind v4. Uso: @import '@medano-ui/tokens/theme.css'; */

@theme inline {
${lines.join('\n')}
}

@theme {
${breakpoints}
}
`;
}

/** Nombre corto (sin prefijo --medano-) usado como key en JS y native. */
function toKey(tokenPath) {
  return toVarName(tokenPath).slice(VAR_PREFIX.length);
}

function toFlatRecord(tokens) {
  return Object.fromEntries(tokens.map((token) => [toKey(token.path), toCssValue(token)]));
}

export function buildJs({ core, dark, light }) {
  const records = {
    core: toFlatRecord(core),
    dark: toFlatRecord(dark),
    light: toFlatRecord(light),
  };
  const cssVars = Object.fromEntries(
    [...core, ...dark].map((token) => [toKey(token.path), `var(${toVarName(token.path)})`]),
  );

  const js = `/* Generado por build.mjs — no editar a mano. */
export const core = ${JSON.stringify(records.core, null, 2)};
export const dark = ${JSON.stringify(records.dark, null, 2)};
export const light = ${JSON.stringify(records.light, null, 2)};
/** Referencias var(--medano-…) listas para usar en estilos inline. */
export const cssVars = ${JSON.stringify(cssVars, null, 2)};
`;

  const typeOf = (record) =>
    `{\n${Object.keys(record)
      .map((key) => `  '${key}': string;`)
      .join('\n')}\n}`;
  const dts = `/* Generado por build.mjs — no editar a mano. */
export declare const core: ${typeOf(records.core)};
export declare const dark: ${typeOf(records.dark)};
export declare const light: ${typeOf(records.light)};
export declare const cssVars: ${typeOf(cssVars)};
`;
  return { js, dts };
}

/** Convierte un color CSS (oklch incluido) a hex sRGB con clamp de canal. */
export function toHex(cssColor) {
  const parsed = parse(cssColor);
  if (!parsed) throw new Error(`Color no parseable: ${cssColor}`);
  const converted = rgb(parsed);
  const clamp = (channel) => Math.min(1, Math.max(0, channel));
  const toByte = (channel) =>
    Math.round(clamp(channel) * 255)
      .toString(16)
      .padStart(2, '0');
  const base = `#${toByte(converted.r)}${toByte(converted.g)}${toByte(converted.b)}`;
  const alpha = converted.alpha ?? 1;
  return alpha < 1 ? `${base}${toByte(alpha)}` : base;
}

/** Valor apto para React Native: colores a hex, dimensiones a número (px/ms). */
export function toNativeValue(token) {
  const { value, type } = token;
  if (type === 'color') return toHex(value);
  if (type === 'duration') return Number.parseFloat(value);
  if (type === 'dimension' && typeof value === 'string') {
    if (value.endsWith('rem')) return Number.parseFloat(value) * REM_IN_PX;
    if (value.endsWith('px')) return Number.parseFloat(value);
    return value; // em y otros: el consumidor decide la conversión
  }
  return value;
}

export function buildNative({ core, dark, light }) {
  const record = (tokens) =>
    Object.fromEntries(tokens.map((token) => [toKey(token.path), toNativeValue(token)]));
  // Los halos son box-shadows CSS, sin equivalente directo en RN: se omiten.
  const withoutShadows = (tokens) => tokens.filter((token) => token.type !== 'shadow');
  return JSON.stringify(
    {
      core: record(core),
      dark: record(withoutShadows(dark)),
      light: record(withoutShadows(light)),
    },
    null,
    2,
  );
}

export function build() {
  const tokens = loadTokens();
  mkdirSync(join(DIST_DIR, 'native'), { recursive: true });
  writeFileSync(join(DIST_DIR, 'vars.css'), buildVarsCss(tokens));
  writeFileSync(join(DIST_DIR, 'theme.css'), buildThemeCss(tokens));
  const { js, dts } = buildJs(tokens);
  writeFileSync(join(DIST_DIR, 'index.js'), js);
  writeFileSync(join(DIST_DIR, 'index.d.ts'), dts);
  writeFileSync(join(DIST_DIR, 'native', 'tokens.json'), buildNative(tokens));
  return tokens;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { core, dark, light } = build();
  console.log(`tokens compilados: ${core.length} core, ${dark.length} dark, ${light.length} light`);
}
