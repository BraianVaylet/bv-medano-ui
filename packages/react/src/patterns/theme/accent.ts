/**
 * Theme bridge de medano: acento configurable en runtime + modo claro/oscuro.
 *
 * Deriva variantes de un hex base (luminancia WCAG) y las escribe sobre los
 * tokens `--medano-accent-*`. Resuelve el gap "cada app bv-* lleva su copia de
 * ThemeProvider + selector de acento" (ver GAPS.md → theme-bridge).
 *
 * Convivencia de formatos (GAPS): unas apps guardan **hex** (`#C96442`), otras
 * un **id** (`'coral'`). `normalizeAccent` acepta ambos y devuelve siempre hex,
 * para que la sincronización entre apps de la familia sea real.
 */

export type ThemeMode = 'light' | 'dark';

export interface AccentOption {
  /** Identificador estable (para persistir/URL). */
  id: string;
  /** Etiqueta accesible. */
  label: string;
  /** Color base en hex. */
  hex: string;
}

/** Paleta por defecto. El primero (coral, brasa de Claude) es el nativo de medano. */
export const MEDANO_ACCENTS: readonly AccentOption[] = [
  { id: 'coral', label: 'Coral', hex: '#C96442' },
  { id: 'orange', label: 'Naranja', hex: '#F76808' },
  { id: 'green', label: 'Verde', hex: '#30A46C' },
  { id: 'blue', label: 'Azul', hex: '#0091FF' },
  { id: 'violet', label: 'Violeta', hex: '#8E4EC6' },
  { id: 'teal', label: 'Teal', hex: '#12A594' },
];

export interface ThemeStorageKeys {
  theme: string;
  accent: string;
}

/** Claves neutrales por defecto; la familia bv-* pasa `bv-theme`/`bv-accent`. */
export const DEFAULT_STORAGE_KEYS: ThemeStorageKeys = {
  theme: 'medano-theme',
  accent: 'medano-accent',
};

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '');
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

const clamp = (n: number): number => Math.max(0, Math.min(255, Math.round(n)));
const toHex = ({ r, g, b }: Rgb): string =>
  `#${[r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('')}`;

function lighten(rgb: Rgb, amt: number): Rgb {
  return {
    r: rgb.r + (255 - rgb.r) * amt,
    g: rgb.g + (255 - rgb.g) * amt,
    b: rgb.b + (255 - rgb.b) * amt,
  };
}

function darken(rgb: Rgb, amt: number): Rgb {
  return { r: rgb.r * (1 - amt), g: rgb.g * (1 - amt), b: rgb.b * (1 - amt) };
}

/** Luminancia relativa WCAG (0..1). */
export function luminance(rgb: Rgb): number {
  const lin = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
}

export interface DerivedAccent {
  base: string;
  strong: string;
  subtle: string;
  onAccent: string;
  focus: string;
}

/** Deriva las variables del acento para un modo dado. */
export function deriveAccent(hex: string, mode: ThemeMode): DerivedAccent {
  const rgb = hexToRgb(hex);
  const base = mode === 'dark' ? lighten(rgb, 0.12) : rgb;
  const strong = mode === 'dark' ? lighten(rgb, 0.24) : darken(rgb, 0.14);
  const onAccent = luminance(base) > 0.45 ? '#10100f' : '#ffffff';
  const rgbArgs = `${clamp(base.r)}, ${clamp(base.g)}, ${clamp(base.b)}`;
  return {
    base: toHex(base),
    strong: toHex(strong),
    subtle: `rgba(${rgbArgs}, 0.16)`,
    onAccent,
    focus: `rgba(${rgbArgs}, 0.75)`,
  };
}

/** Tokens que sobrescribe el acento elegido (contrato seguro de pisar, GAPS #6). */
const MEDANO_ACCENT_VARS = [
  '--medano-accent-base',
  '--medano-accent-strong',
  '--medano-accent-subtle',
  '--medano-ink-on-accent',
  '--medano-border-focus',
] as const;

/** Aplica el acento al <html> sobre los tokens de medano. */
export function applyAccent(hex: string, mode: ThemeMode): void {
  const d = deriveAccent(hex, mode);
  const el = document.documentElement;
  el.style.setProperty('--medano-accent-base', d.base);
  el.style.setProperty('--medano-accent-strong', d.strong);
  el.style.setProperty('--medano-accent-subtle', d.subtle);
  el.style.setProperty('--medano-ink-on-accent', d.onAccent);
  el.style.setProperty('--medano-border-focus', d.focus);
}

/** Quita las sobreescrituras: vuelve al acento nativo de medano (brasa). */
export function clearAccent(): void {
  const el = document.documentElement;
  for (const varName of MEDANO_ACCENT_VARS) el.style.removeProperty(varName);
}

/** Aplica modo (data-theme) + reaplica acento (cambia con el modo). */
export function applyTheme(mode: ThemeMode, accentHex: string | null): void {
  document.documentElement.setAttribute('data-theme', mode);
  if (accentHex) applyAccent(accentHex, mode);
  else clearAccent();
}

/** Normaliza un valor guardado (hex o id de paleta) a hex, o null. */
export function normalizeAccent(
  value: string | null | undefined,
  accents: readonly AccentOption[] = MEDANO_ACCENTS,
): string | null {
  if (!value) return null;
  if (value.startsWith('#')) return value;
  return accents.find((a) => a.id === value)?.hex ?? null;
}

const canUseDom = (): boolean => typeof window !== 'undefined';

/** Modo inicial: localStorage → preferencia del sistema. */
export function getInitialTheme(keys: ThemeStorageKeys = DEFAULT_STORAGE_KEYS): ThemeMode {
  if (!canUseDom()) return 'dark';
  const stored = localStorage.getItem(keys.theme);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Acento inicial (hex normalizado) o null = acento nativo de medano. */
export function getInitialAccent(
  keys: ThemeStorageKeys = DEFAULT_STORAGE_KEYS,
  accents: readonly AccentOption[] = MEDANO_ACCENTS,
): string | null {
  if (!canUseDom()) return null;
  return normalizeAccent(localStorage.getItem(keys.accent), accents);
}
