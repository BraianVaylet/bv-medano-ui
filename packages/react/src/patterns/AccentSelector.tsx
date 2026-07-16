import { useEffect, useId, useRef, useState } from 'react';
import { useMedanoTheme } from './theme/ThemeProvider';

export interface AccentSelectorProps {
  /** Nombre accesible del disparador. */
  label?: string;
  className?: string;
}

/**
 * Selector de color de acento de la app. Único para toda la familia bv-*
 * (antes cada app llevaba su copia). Lee la paleta y el acento activo del
 * ThemeProvider de medano.
 */
export function AccentSelector({ label = 'Color de acento', className }: AccentSelectorProps) {
  const { accent, accents, setAccent } = useMedanoTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const activeHex = accent ?? 'var(--medano-accent-base)';

  return (
    <div ref={ref} className={['medano-accent-selector', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="medano-button medano-icon-button"
        data-variant="secondary"
        data-size="md"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="medano-accent-selector__current" style={{ background: activeHex }} />
      </button>
      {open && (
        <div
          className="medano-accent-selector__panel"
          id={panelId}
          role="listbox"
          aria-label={label}
        >
          {accents.map((a) => {
            const selected = accent?.toLowerCase() === a.hex.toLowerCase();
            return (
              <button
                key={a.id}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={a.label}
                title={a.label}
                className="medano-accent-selector__swatch"
                data-selected={selected || undefined}
                style={{ background: a.hex }}
                onClick={() => {
                  setAccent(a.hex);
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
