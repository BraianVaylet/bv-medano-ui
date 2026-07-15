import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  applyTheme,
  DEFAULT_STORAGE_KEYS,
  getInitialAccent,
  getInitialTheme,
  MEDANO_ACCENTS,
  normalizeAccent,
  type AccentOption,
  type ThemeMode,
  type ThemeStorageKeys,
} from './accent';

export interface ThemeContextValue {
  mode: ThemeMode;
  /** Hex del acento activo, o null = acento nativo de medano (brasa). */
  accent: string | null;
  /** Paleta disponible (para pintar el selector). */
  accents: readonly AccentOption[];
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  /** Acepta hex o id de paleta; null vuelve al acento nativo. */
  setAccent: (value: string | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Claves de localStorage. La familia bv-* pasa `{ theme: 'bv-theme', accent: 'bv-accent' }`. */
  storageKeys?: ThemeStorageKeys;
  /** Paleta de acentos a ofrecer. Por defecto la de medano. */
  accents?: readonly AccentOption[];
}

/**
 * Provider único de tema + acento para toda la familia. Aplica `data-theme` y
 * los tokens de acento al <html> en cada cambio y los persiste. Sustituye al
 * ThemeProvider copiado en cada app bv-* (GAPS → theme-bridge).
 */
export function ThemeProvider({
  children,
  storageKeys = DEFAULT_STORAGE_KEYS,
  accents = MEDANO_ACCENTS,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialTheme(storageKeys));
  const [accent, setAccentState] = useState<string | null>(() =>
    getInitialAccent(storageKeys, accents),
  );

  useEffect(() => {
    applyTheme(mode, accent);
  }, [mode, accent]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      localStorage.setItem(storageKeys.theme, next);
      setModeState(next);
    },
    [storageKeys.theme],
  );

  const toggleMode = useCallback(() => {
    setModeState((m) => {
      const next: ThemeMode = m === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKeys.theme, next);
      return next;
    });
  }, [storageKeys.theme]);

  const setAccent = useCallback(
    (value: string | null) => {
      const hex = normalizeAccent(value, accents);
      if (hex) localStorage.setItem(storageKeys.accent, hex);
      else localStorage.removeItem(storageKeys.accent);
      setAccentState(hex);
    },
    [accents, storageKeys.accent],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, accent, accents, setMode, toggleMode, setAccent }),
    [mode, accent, accents, setMode, toggleMode, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Fallback inerte cuando no hay provider (tests que montan una página suelta). */
const FALLBACK: ThemeContextValue = {
  mode: 'dark',
  accent: null,
  accents: MEDANO_ACCENTS,
  setMode: () => {},
  toggleMode: () => {},
  setAccent: () => {},
};

export function useMedanoTheme(): ThemeContextValue {
  return useContext(ThemeContext) ?? FALLBACK;
}
