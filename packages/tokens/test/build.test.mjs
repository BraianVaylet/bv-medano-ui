import { describe, expect, it } from 'vitest';
import { parse, rgb } from 'culori';
import {
  buildThemeCss,
  buildVarsCss,
  flattenTokens,
  loadTokens,
  resolveAlias,
  toCssValue,
  toHex,
  toNativeValue,
  toVarName,
} from '../build.mjs';

describe('flattenTokens', () => {
  it('aplana grupos anidados heredando $type del grupo', () => {
    const tree = {
      color: {
        $type: 'color',
        aqua: { 300: { $value: 'oklch(0.78 0.115 195)' } },
      },
    };
    expect(flattenTokens(tree)).toEqual([
      { path: 'color.aqua.300', value: 'oklch(0.78 0.115 195)', type: 'color' },
    ]);
  });

  it('ignora claves de metadata ($description, etc.)', () => {
    const tree = { space: { $type: 'dimension', $description: 'x', md: { $value: '1rem' } } };
    expect(flattenTokens(tree)).toHaveLength(1);
  });
});

describe('resolveAlias', () => {
  const lookup = { 'color.aqua.300': 'oklch(0.78 0.115 195)', a: '{b}', b: '{a}' };

  it('resuelve un alias simple', () => {
    expect(resolveAlias('{color.aqua.300}', lookup)).toBe('oklch(0.78 0.115 195)');
  });

  it('deja pasar valores que no son alias', () => {
    expect(resolveAlias('oklch(0.5 0 0)', lookup)).toBe('oklch(0.5 0 0)');
  });

  it('explota con alias circular', () => {
    expect(() => resolveAlias('{a}', lookup)).toThrow(/circular/i);
  });

  it('explota con alias sin destino', () => {
    expect(() => resolveAlias('{no.existe}', lookup)).toThrow(/sin destino/i);
  });
});

describe('toVarName', () => {
  it.each([
    ['surface.0', '--medano-surface-0'],
    ['ink.primary', '--medano-ink-primary'],
    ['motion.duration.base', '--medano-duration-base'],
    ['motion.ease.snap', '--medano-ease-snap'],
    ['font.size.md', '--medano-text-md'],
    ['font.family.sans', '--medano-font-sans'],
    ['space.md', '--medano-space-md'],
  ])('%s -> %s', (path, expected) => {
    expect(toVarName(path)).toBe(expected);
  });
});

describe('toCssValue', () => {
  it('serializa cubicBezier', () => {
    expect(toCssValue({ value: [0.2, 0, 0, 1], type: 'cubicBezier' })).toBe(
      'cubic-bezier(0.2, 0, 0, 1)',
    );
  });

  it('serializa fontFamily citando nombres con espacios', () => {
    expect(toCssValue({ value: ['medano Sans', 'sans-serif'], type: 'fontFamily' })).toBe(
      "'medano Sans', sans-serif",
    );
  });
});

describe('toHex / toNativeValue', () => {
  it('convierte oklch opaco a hex sRGB', () => {
    expect(toHex('oklch(1 0 0)')).toBe('#ffffff');
    expect(toHex('oklch(0 0 0)')).toBe('#000000');
  });

  it('convierte alpha a hex8', () => {
    expect(toHex('oklch(1 0 0 / 0.5)')).toMatch(/^#ffffff[0-9a-f]{2}$/);
  });

  it('convierte dimensiones rem a px numéricos', () => {
    expect(toNativeValue({ value: '1rem', type: 'dimension' })).toBe(16);
    expect(toNativeValue({ value: '120ms', type: 'duration' })).toBe(120);
    expect(toNativeValue({ value: '9999px', type: 'dimension' })).toBe(9999);
  });
});

describe('salida CSS', () => {
  const tokens = loadTokens();

  it('vars.css: dark por defecto, light por data-theme y por media query', () => {
    const css = buildVarsCss(tokens);
    expect(css).toContain(':root {');
    expect(css).toContain('color-scheme: dark;');
    expect(css).toContain("[data-theme='light']");
    expect(css).toContain('@media (prefers-color-scheme: light)');
    expect(css).toContain('--medano-surface-0: oklch(0.235 0.008 85);');
  });

  it('theme.css: expone namespaces Tailwind v4 apuntando a las vars', () => {
    const css = buildThemeCss(tokens);
    expect(css).toContain('@theme inline {');
    expect(css).toContain('--color-surface-0: var(--medano-surface-0);');
    expect(css).toContain('--color-accent: var(--medano-accent-base);');
    expect(css).toContain('--breakpoint-sm: 40rem;');
  });
});

/* ---------- Auditoría de contraste WCAG 2.1 AA ---------- */

function relativeLuminance(cssColor) {
  const converted = rgb(parse(cssColor));
  const linear = (channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  return 0.2126 * linear(converted.r) + 0.7152 * linear(converted.g) + 0.0722 * linear(converted.b);
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

describe('contraste WCAG AA', () => {
  const { dark, light } = loadTokens();
  const valueOf = (tokens, path) => tokens.find((token) => token.path === path)?.value;

  const themes = [
    ['dark', dark],
    ['light', light],
  ];

  for (const [themeName, theme] of themes) {
    describe(`tema ${themeName}`, () => {
      it('ink.primary alcanza 4.5:1 sobre las 8 superficies', () => {
        for (let level = 0; level <= 7; level++) {
          const ratio = contrastRatio(
            valueOf(theme, 'ink.primary'),
            valueOf(theme, `surface.${level}`),
          );
          expect(ratio, `ink.primary sobre surface.${level}`).toBeGreaterThanOrEqual(4.5);
        }
      });

      it('ink.secondary alcanza 4.5:1 sobre surface 0–3', () => {
        for (let level = 0; level <= 3; level++) {
          const ratio = contrastRatio(
            valueOf(theme, 'ink.secondary'),
            valueOf(theme, `surface.${level}`),
          );
          expect(ratio, `ink.secondary sobre surface.${level}`).toBeGreaterThanOrEqual(4.5);
        }
      });

      it('ink.muted alcanza 4.5:1 sobre surface 0–2 (su rango documentado)', () => {
        for (let level = 0; level <= 2; level++) {
          const ratio = contrastRatio(
            valueOf(theme, 'ink.muted'),
            valueOf(theme, `surface.${level}`),
          );
          expect(ratio, `ink.muted sobre surface.${level}`).toBeGreaterThanOrEqual(4.5);
        }
      });

      it('ink.on-accent alcanza 4.5:1 sobre accent.base y accent.strong', () => {
        for (const accent of ['accent.base', 'accent.strong']) {
          const ratio = contrastRatio(valueOf(theme, 'ink.on-accent'), valueOf(theme, accent));
          expect(ratio, `on-accent sobre ${accent}`).toBeGreaterThanOrEqual(4.5);
        }
      });

      it('colores de feedback alcanzan 3:1 sobre surface 0–2 (uso en iconos/bordes)', () => {
        for (const path of ['feedback.positive', 'feedback.caution', 'feedback.danger']) {
          for (let level = 0; level <= 2; level++) {
            const ratio = contrastRatio(valueOf(theme, path), valueOf(theme, `surface.${level}`));
            expect(ratio, `${path} sobre surface.${level}`).toBeGreaterThanOrEqual(3);
          }
        }
      });
    });
  }
});
