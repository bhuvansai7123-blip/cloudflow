/** A small switch between a few options, used for ranges, billing and chart metrics. */
export default function Segmented({ options, value, onChange, label, size = 'md' }) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-xl border border-line bg-surface/60 p-1">
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`rounded-lg font-medium transition ${pad} ${
              active ? 'bg-raised text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
