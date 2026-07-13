import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/** Tecla de teclado: `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`. */
export function Kbd({ className, children, ...rest }: KbdProps) {
  return (
    <kbd className={['medano-kbd', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </kbd>
  );
}

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/** Código inline. Para bloques usá <pre> con la clase medano-code. */
export function Code({ className, children, ...rest }: CodeProps) {
  return (
    <code className={['medano-code', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </code>
  );
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Abre en pestaña nueva con rel seguro y lo anuncia a lectores de pantalla. */
  external?: boolean;
  children: ReactNode;
}

export function Link({ external = false, className, children, ...rest }: LinkProps) {
  return (
    <a
      className={['medano-link', className].filter(Boolean).join(' ')}
      target={external ? '_blank' : rest.target}
      rel={external ? 'noopener noreferrer' : rest.rel}
      {...rest}
    >
      {children}
      {external && <span className="medano-visually-hidden"> (abre en pestaña nueva)</span>}
    </a>
  );
}
