/**
 * Empaqueta medano Sans v1.
 *
 * v1 usa los binarios de Hanken Grotesk (SIL OFL, vía fontsource) sin
 * modificar, con alias de familia "medano Sans" declarado en CSS — el alias no
 * modifica la fuente, así que no aplica la restricción de Reserved Font Name.
 * La fase 2 (fork real con fontmake: ajustes de terminales y glifos) sí
 * requerirá renombrar dentro del binario.
 */
import { copyFileSync, mkdirSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_DIR = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(PKG_DIR, 'dist');

const require = createRequire(import.meta.url);
const fontsourceDir = dirname(require.resolve('@fontsource-variable/hanken-grotesk/package.json'));
const filesDir = join(fontsourceDir, 'files');

/** Subsets que cubren español e inglés completos. */
const SUBSETS = ['latin', 'latin-ext'];

const UNICODE_RANGES = {
  latin:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FB01-FB02',
  'latin-ext':
    'U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF',
};

// dist se regenera desde cero: sin limpieza quedarían binarios de marcas
// anteriores que "files": ["dist"] publicaría a npm.
rmSync(DIST_DIR, { recursive: true, force: true });
mkdirSync(DIST_DIR, { recursive: true });

const faces = [];
for (const subset of SUBSETS) {
  const fileName = `hanken-grotesk-${subset}-wght-normal.woff2`;
  const sourcePath = join(filesDir, fileName);
  if (!existsSync(sourcePath)) {
    throw new Error(`No se encontró ${fileName} en ${filesDir} — ¿cambió el layout de fontsource?`);
  }
  const outName = `medano-sans-${subset}.woff2`;
  copyFileSync(sourcePath, join(DIST_DIR, outName));
  faces.push(`@font-face {
  font-family: 'medano Sans';
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url('./${outName}') format('woff2-variations');
  unicode-range: ${UNICODE_RANGES[subset]};
}`);
}

writeFileSync(
  join(DIST_DIR, 'medano-sans.css'),
  `/* medano Sans — generado por build.mjs. Derivada de Hanken Grotesk (SIL OFL 1.1). */\n\n${faces.join('\n\n')}\n`,
);

const licenseSource = join(fontsourceDir, 'LICENSE');
if (existsSync(licenseSource)) {
  copyFileSync(licenseSource, join(PKG_DIR, 'LICENSE-OFL.txt'));
}

console.log(
  `medano Sans empaquetada: ${faces.length} subsets (${readdirSync(DIST_DIR).join(', ')})`,
);
