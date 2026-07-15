import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Spinner } from '../spinner/Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Muestra spinner y bloquea interacción sin cambiar el ancho del botón. */
  loading?: boolean;
  /** Ocupa todo el ancho disponible (patrón principal en mobile). */
  fullWidth?: boolean;
  /**
   * Renderiza el botón como otro elemento conservando el estilo medano.
   * Pensado para link-buttons de router: `<Button render={<Link to="/x" />}>Ir</Button>`.
   * El contenido (texto/íconos) lo aporta `children`, no el elemento de `render`.
   */
  render?: ReactElement<Record<string, unknown>>;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    render,
    ...rest
  },
  ref,
) {
  const inner = (
    <>
      {loading && <Spinner className="medano-button__spinner" size="sm" label="Cargando" />}
      <span className="medano-button__content">{children}</span>
    </>
  );

  const styleProps = {
    'data-variant': variant,
    'data-size': size,
    'data-full-width': fullWidth || undefined,
    'data-loading': loading || undefined,
  };

  // Escape hatch para router links (react-router <Link>, etc.): clonamos el
  // elemento provisto inyectándole las clases/props de medano. Base UI expone
  // `render`; acá lo resolvemos con cloneElement para no atar Button a Base UI.
  if (render && isValidElement(render)) {
    const provided = render.props as { className?: string };
    return cloneElement(
      render,
      {
        ...rest,
        ...provided,
        ...styleProps,
        className: ['medano-button', className, provided.className].filter(Boolean).join(' '),
        'aria-disabled': disabled || loading || undefined,
        ref,
      },
      inner,
    );
  }

  return (
    <button
      ref={ref}
      type={rest.type ?? 'button'}
      className={['medano-button', className].filter(Boolean).join(' ')}
      {...styleProps}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {inner}
    </button>
  );
});
