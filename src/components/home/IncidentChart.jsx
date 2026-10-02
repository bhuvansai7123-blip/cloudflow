import { INCIDENT_WINDOW, DEPLOYS } from '../../data/mock'

const W = 600
const H = 200

/** The hero chart: real mock latency with the deploy and incident marked on it. */
export default function IncidentChart({ data }) {
  const values = data.map((d) => d.latency)
  const min = 60
  const max = Math.max(...values) + 30
  const x = (i) => (i / (values.length - 1)) * W
  const y = (v) => H - ((v - min) / (max - min)) * H
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H} Z`

  const at = (time) => data.findIndex((d) => d.time === time)
  const pct = (i) => (i / (values.length - 1)) * 100
  const bandStart = pct(at(INCIDENT_WINDOW.from))
  const bandEnd = pct(at(INCIDENT_WINDOW.to))
  const deployX = pct(at(DEPLOYS[1].time))

  return (
    <div>
      <div className="relative aspect-[3/1]" role="img" aria-label="Response time over 24 hours. A deploy at 14:05 is followed by a spike.">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'rgb(var(--ink))', stopOpacity: 0.16 }} />
              <stop offset="1" style={{ stopColor: 'rgb(var(--ink))', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[50, 100, 150].map((gy) => (
            <line key={gy} x1="0" x2={W} y1={gy} y2={gy} className="stroke-line" strokeDasharray="2 5" />
          ))}
          <path d={area} fill="url(#heroFill)" className="fade-in-late" />
          <path d={line} pathLength="1" fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="draw-line stroke-ink" />
        </svg>
        <div className="absolute inset-y-0 border-x border-bad/30 bg-bad/10" style={{ left: `${bandStart}%`, width: `${bandEnd - bandStart}%` }}>
          <span className="absolute bottom-1.5 left-1.5 hidden text-[10px] font-medium text-bad sm:block">INC-2041</span>
        </div>
        <div className="absolute inset-y-0 border-l border-dashed border-faint" style={{ left: `${deployX}%` }}>
          <span className="absolute right-full top-1.5 mr-1.5 whitespace-nowrap rounded bg-raised px-1.5 py-0.5 text-[10px] text-muted">
            v2.14.0 deployed, 14:05
          </span>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-[10px] tabular-nums text-faint">
        <span>{data[0].time}</span>
        <span>{data[16].time}</span>
        <span>{data[32].time}</span>
        <span>Now</span>
      </div>
    </div>
  )
}
