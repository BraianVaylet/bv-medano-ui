import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type ToastTone = 'neutral' | 'positive' | 'caution' | 'danger';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** ms visibles; el hover pausa el descarte. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 5000;

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast requiere un <ToastProvider> ancestro');
  }
  return context;
}

/**
 * Feedback ambiental: los avisos se funden al aparecer en la zona baja
 * (pulgar primero), no saltan ni interrumpen. role=status → lectores de
 * pantalla los anuncian sin robar el foco.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const schedule = useCallback(
    (id: number, duration: number) => {
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );
    },
    [dismiss],
  );

  const show = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, ...options }]);
      schedule(id, options.duration ?? DEFAULT_DURATION_MS);
    },
    [schedule],
  );

  const pauseAll = useCallback(() => {
    for (const timer of timers.current.values()) clearTimeout(timer);
    timers.current.clear();
  }, []);

  const resumeAll = useCallback(() => {
    setToasts((current) => {
      for (const toast of current) {
        if (!timers.current.has(toast.id)) {
          schedule(toast.id, toast.duration ?? DEFAULT_DURATION_MS);
        }
      }
      return current;
    });
  }, [schedule]);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="medano-toasts"
        role="region"
        aria-label="Notificaciones"
        onMouseEnter={pauseAll}
        onMouseLeave={resumeAll}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="medano-toast"
            data-tone={toast.tone ?? 'neutral'}
          >
            <div className="medano-toast__body">
              <p className="medano-toast__title">{toast.title}</p>
              {toast.description && <p className="medano-toast__description">{toast.description}</p>}
            </div>
            <button
              type="button"
              className="medano-toast__close"
              aria-label="Cerrar aviso"
              onClick={() => dismiss(toast.id)}
            >
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M3 3l6 6M9 3l-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
