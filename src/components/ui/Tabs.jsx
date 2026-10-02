/**
 * Accessible tab list. Arrow keys move between tabs.
 * variant "pills" is a compact bar; "sidebar" is a vertical nav on large screens (used by the dashboard).
 */
export default function Tabs({ tabs, value, onChange, label, idPrefix = 'tab', variant = 'pills' }) {
  const move = (step) => {
    const i = tabs.findIndex((t) => t.id === value)
    const next = tabs[(i + step + tabs.length) % tabs.length]
    onChange(next.id)
    requestAnimationFrame(() => document.getElementById(`${idPrefix}-${next.id}`)?.focus())
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      move(1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      move(-1)
    }
  }

  const wrap =
    variant === 'sidebar'
      ? 'scroll-x flex gap-1 p-2 lg:flex-col lg:p-3'
      : 'scroll-x flex gap-1 rounded-xl border border-line p-1'

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={wrap}>
      {tabs.map((t) => {
        const active = t.id === value
        const TabIcon = t.icon
        return (
          <button
            key={t.id}
            id={`${idPrefix}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active ? 'bg-raised text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {TabIcon && <TabIcon className="h-4 w-4" aria-hidden="true" />}
            {t.label}
            {t.badge ? (
              <span className="ml-auto rounded-full bg-bad/15 px-1.5 text-xs font-semibold text-bad" aria-label={`${t.badge} active`}>
                {t.badge}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
