import Badge from '../ui/Badge'
import { incidents, SEVERITY_TONE } from '../../data/mock'

export default function IncidentList({ onlyActive = false, detailed = false }) {
  const list = onlyActive ? incidents.filter((i) => i.active) : incidents
  return (
    <ul className="space-y-3">
      {list.map((i) => (
        <li key={i.id} className="rounded-lg border border-line bg-bg/40 p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={SEVERITY_TONE[i.severity]}>{i.severity}</Badge>
            <span className="text-xs text-faint">{i.id}</span>
            <span className="ml-auto text-xs text-muted">{i.status}</span>
          </div>
          <p className="mt-2 text-sm font-medium">{i.title}</p>
          <p className="mt-1 text-xs text-muted">
            {i.service}, started {i.started}
          </p>
          {detailed && <p className="mt-2 text-sm leading-relaxed text-muted">{i.summary}</p>}
        </li>
      ))}
    </ul>
  )
}
