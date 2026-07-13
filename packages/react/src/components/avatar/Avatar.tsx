import type { HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Nombre de la persona: alt de la imagen o fuente de las iniciales. */
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MAX_INITIALS = 2;

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, MAX_INITIALS)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, src, size = 'md', className, ...rest }: AvatarProps) {
  return (
    <span
      className={['medano-avatar', className].filter(Boolean).join(' ')}
      data-size={size}
      {...rest}
    >
      {src ? (
        <img className="medano-avatar__image" src={src} alt={name} />
      ) : (
        <span aria-hidden="true">{initialsOf(name)}</span>
      )}
      {!src && <span className="medano-visually-hidden">{name}</span>}
    </span>
  );
}
