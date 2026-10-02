/** Tiny decorative demo elements shown inside feature cards. All fictional. */
const bars = [38, 52, 44, 68, 58, 74, 62, 80, 66, 72, 54, 84]

const VISUALS = {
  advisor: () => (
    <div className="space-y-1.5 text-xs">
      <p className="ml-auto w-fit rounded-lg bg-raised px-2.5 py-1">Why is checkout slow?</p>
      <p className="w-fit rounded-lg border border-line px-2.5 py-1 text-muted">A deploy at 14:05 filled the database pool.</p>
    </div>
  ),
  monitoring: ({ large }) => (
    <div className={`flex items-end gap-1.5 ${large ? 'h-24' : 'h-12'}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className="flex-1 rounded-[3px] bg-muted/40" style={{ height: `${h}%` }} />
      ))}
    </div>
  ),
  incidents: () => (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-md border border-bad/30 bg-bad/10 px-2 py-1 font-medium text-bad">47 alerts</span>
      <span className="text-faint" aria-hidden="true">to</span>
      <span className="rounded-md border border-ok/30 bg-ok/10 px-2 py-1 font-medium text-ok">1 incident</span>
    </div>
  ),
  analytics: () => (
    <svg viewBox="0 0 120 40" className="h-12 w-full" aria-hidden="true">
      <path d="M0 30 C15 28 20 10 35 14 S60 34 75 20 S100 6 120 10" fill="none" className="stroke-flow" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  health: () => (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="none" className="stroke-line" strokeWidth="4" />
        <circle cx="18" cy="18" r="15" fill="none" className="stroke-ok" strokeWidth="4" strokeLinecap="round" strokeDasharray="88.5 94.2" />
      </svg>
      <span className="font-display text-xl font-semibold tabular-nums">94<span className="text-sm text-muted">/100</span></span>
    </div>
  ),
  collab: () => (
    <div className="flex -space-x-2" aria-hidden="true">
      {['PR', 'JW', 'AN', 'LM'].map((t) => (
        <span key={t} className="grid h-9 w-9 place-items-center rounded-full border-2 border-bg bg-raised text-xs font-semibold">{t}</span>
      ))}
    </div>
  ),
  reports: () => (
    <div className="space-y-1.5" aria-hidden="true">
      <span className="block h-2 w-3/4 rounded bg-line" />
      <span className="block h-2 w-full rounded bg-line" />
      <span className="block h-2 w-1/2 rounded bg-line" />
    </div>
  ),
  alerts: () => (
    <div className="space-y-2 text-xs">
      {[['CPU above 80%', true], ['Errors above 1%', true], ['Disk above 90%', false]].map(([label, on]) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-muted">{label}</span>
          <span className={`h-4 w-7 rounded-full p-0.5 ${on ? 'bg-ok/70' : 'bg-line'}`} aria-hidden="true">
            <span className={`block h-3 w-3 rounded-full bg-white ${on ? 'translate-x-3' : ''}`} />
          </span>
        </div>
      ))}
    </div>
  ),
}

export default function FeatureVisual({ id, large = false }) {
  const Visual = VISUALS[id]
  return Visual ? <Visual large={large} /> : null
}
