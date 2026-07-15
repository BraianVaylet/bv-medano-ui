import type { ReactNode } from 'react';
import { AccentSelector } from './AccentSelector';
import { ThemeToggle } from './ThemeToggle';

export interface AuthLayoutProps {
  /** Marca de la app. Junto al nombre, lo único que cambia entre apps. */
  logo?: ReactNode;
  appName: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** El formulario (login/registro) — varía por app. */
  children: ReactNode;
  /** Pie: enlace a la pantalla hermana (crear cuenta / ingresar). */
  footer?: ReactNode;
  showAccentSelector?: boolean;
  showThemeToggle?: boolean;
}

/**
 * Plantilla única de autenticación (login + registro) para la familia bv-*.
 * Centra una tarjeta con marca + controles de tema; el formulario va como
 * children (item 6: un solo template, cambia logo + nombre).
 */
export function AuthLayout({
  logo,
  appName,
  title,
  subtitle,
  children,
  footer,
  showAccentSelector = true,
  showThemeToggle = true,
}: AuthLayoutProps) {
  return (
    <main className="medano-auth">
      <header className="medano-auth__header">
        <div className="medano-auth__brand">
          {logo && <span className="medano-auth__logo">{logo}</span>}
          <span className="medano-auth__name">{appName}</span>
        </div>
        <div className="medano-auth__actions">
          {showAccentSelector && <AccentSelector />}
          {showThemeToggle && <ThemeToggle />}
        </div>
      </header>
      <section className="medano-card medano-auth__card" data-elevation="1">
        <h1 className="medano-auth__title">{title}</h1>
        {subtitle && <p className="medano-auth__subtitle">{subtitle}</p>}
        {children}
      </section>
      {footer && <div className="medano-auth__footer">{footer}</div>}
    </main>
  );
}
