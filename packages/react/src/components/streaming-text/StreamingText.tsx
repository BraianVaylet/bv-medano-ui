import { useEffect, useState, type HTMLAttributes } from 'react';

export interface StreamingTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Texto acumulado hasta el momento (crece con cada chunk del stream). */
  text: string;
  /** Mientras es true muestra el indicador de respiración al final. */
  streaming?: boolean;
  /**
   * Tinta fantasma: contenido generado aún no aceptado por el usuario
   * (principio "la IA es un material").
   */
  ghost?: boolean;
}

/**
 * Texto que llega en streaming con su propio ritmo: cada chunk nuevo se funde
 * al aparecer en lugar de saltar. aria-live anuncia el contenido a lectores de
 * pantalla sin repetir lo ya leído.
 */
export function StreamingText({
  text,
  streaming = false,
  ghost = false,
  className,
  ...rest
}: StreamingTextProps) {
  const [chunks, setChunks] = useState<string[]>(text ? [text] : []);

  useEffect(() => {
    setChunks((previous) => {
      const previousText = previous.join('');
      if (text === previousText) return previous;
      // El texto creció: solo el sufijo nuevo se anima
      if (text.startsWith(previousText)) return [...previous, text.slice(previousText.length)];
      // El texto cambió de raíz (mensaje nuevo): reinicio sin animación acumulada
      return text ? [text] : [];
    });
  }, [text]);

  return (
    <div
      className={['medano-stream', className].filter(Boolean).join(' ')}
      data-ghost={ghost || undefined}
      aria-live="polite"
      aria-busy={streaming || undefined}
      {...rest}
    >
      {chunks.map((chunk, index) => (
        <span className="medano-stream__chunk" key={`${index}-${chunk.length}`}>
          {chunk}
        </span>
      ))}
      {streaming && (
        <span className="medano-stream__pulse" aria-hidden="true">
          ●
        </span>
      )}
    </div>
  );
}
