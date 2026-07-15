import type { ReactNode } from 'react';
import { AccentSelector } from './AccentSelector';
import { ThemeToggle } from './ThemeToggle';

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export interface AppHeaderProps {
  /** Marca de la app (SVG/imagen). Lo único que cambia entre apps de la familia. */
  logo?: ReactNode;
  /** Nombre de la app. */
  title: ReactNode;
  /** Segunda línea opcional (ej: "Hola, alias"). */
  subtitle?: ReactNode;
  /** Acciones extra antes de los controles de tema (ej: notificaciones). */
  actions?: ReactNode;
  /** Muestra el selector de acento (default true). */
  showAccentSelector?: boolean;
  /** Muestra el toggle de tema (default true). */
  showThemeToggle?: boolean;
  /** Si se pasa, renderiza un botón de cerrar sesión (solo icono). */
  onLogout?: () => void;
  logoutLoading?: boolean;
  logoutLabel?: string;
  className?: string;
}

/**
 * Header común de las apps de la familia bv-*: marca + controles de tema.
 * Antes cada app lo componía a mano; ahora es un solo componente (item 6).
 */
export function AppHeader({
  logo,
  title,
  subtitle,
  actions,
  showAccentSelector = true,
  showThemeToggle = true,
  onLogout,
  logoutLoading,
  logoutLabel = 'Salir',
  className,
}: AppHeaderProps) {
  return (
    <header className={['medano-app-header', className].filter(Boolean).join(' ')}>
      <div className="medano-app-header__brand">
        {logo && <span className="medano-app-header__logo">{logo}</span>}
        <div className="medano-app-header__titles">
          <span className="medano-app-header__name">{title}</span>
          {subtitle && <span className="medano-app-header__subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="medano-app-header__actions">
        {actions}
        {showAccentSelector && <AccentSelector />}
        {showThemeToggle && <ThemeToggle />}
        {onLogout && (
          <button
            type="button"
            className="medano-button medano-icon-button"
            data-variant="secondary"
            data-size="md"
            data-loading={logoutLoading || undefined}
            disabled={logoutLoading}
            aria-label={logoutLabel}
            title={logoutLabel}
            onClick={onLogout}
          >
            <LogOutIcon />
          </button>
        )}
      </div>
    </header>
  );
}
