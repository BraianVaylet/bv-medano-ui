import { useMedanoTheme } from './theme/ThemeProvider';

export interface ThemeToggleProps {
  className?: string;
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/** Alterna claro/oscuro. Único para toda la familia bv-*. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { mode, toggleMode } = useMedanoTheme();
  const isDark = mode === 'dark';
  return (
    <button
      type="button"
      className={['medano-button', 'medano-icon-button', className].filter(Boolean).join(' ')}
      data-variant="secondary"
      data-size="md"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      onClick={toggleMode}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
