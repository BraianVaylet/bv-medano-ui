import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: ReactNode;
}

/** Checkbox nativo estilizado: semántica y teclado gratis, estilo medano. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref,
) {
  return (
    <label className={['medano-check', className].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" className="medano-check__input" {...rest} />
      <span className="medano-check__box" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="medano-check__label">{label}</span>
    </label>
  );
});
