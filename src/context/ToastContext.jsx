import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: <CheckCircle2 className="h-4 w-4 text-ok" aria-hidden="true" />,
  info: <Info className="h-4 w-4 text-flow" aria-hidden="true" />,
  error: <AlertCircle className="h-4 w-4 text-bad" aria-hidden="true" />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1)

  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    (message, type = 'info') => {
      const id = nextId.current++
      setToasts((list) => [...list.slice(-2), { id, message, type }])
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="glass pointer-events-auto flex max-w-md animate-toastIn items-center gap-3 rounded-xl py-3 pl-4 pr-3 text-sm shadow-xl shadow-black/20"
          >
            {ICONS[t.type] ?? ICONS.info}
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="rounded-md p-1 text-muted hover:bg-raised hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx.toast
}
