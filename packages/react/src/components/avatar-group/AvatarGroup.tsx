import type { HTMLAttributes } from 'react';
import { Avatar, type AvatarProps } from '../avatar/Avatar';

export interface AvatarGroupItem {
  name: string;
  src?: string;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[];
  /** Cuántos se muestran antes de colapsar en "+N". */
  max?: number;
  size?: AvatarProps['size'];
}

export function AvatarGroup({ items, max = 4, size = 'sm', className, ...rest }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;
  return (
    <div className={['medano-avatar-group', className].filter(Boolean).join(' ')} {...rest}>
      {visible.map((item) => (
        <Avatar key={item.name} name={item.name} src={item.src} size={size} />
      ))}
      {hidden > 0 && (
        <span className="medano-avatar medano-avatar-group__more" data-size={size}>
          <span aria-hidden="true">+{hidden}</span>
          <span className="medano-visually-hidden">{hidden} personas más</span>
        </span>
      )}
    </div>
  );
}
