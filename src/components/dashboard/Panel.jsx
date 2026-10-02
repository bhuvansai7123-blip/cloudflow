/** A titled dashboard block. Slightly tighter corners than page-level cards, like a real app. */
export default function Panel({ title, subtitle, action, className = '', children }) {
  return (
    <section className={`metal metal rounded-xl border border-line bg-surface p-4 ${className}`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-faint">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
