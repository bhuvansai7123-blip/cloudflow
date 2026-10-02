import { Rocket, TriangleAlert, CheckCircle2, Scaling, Settings2, Bell } from 'lucide-react'
import { events } from '../../data/mock'

const TYPES = {
  deploy: { icon: Rocket, tone: 'text-flow', label: 'Deploy' },
  incident: { icon: TriangleAlert, tone: 'text-warn', label: 'Incident' },
  resolved: { icon: CheckCircle2, tone: 'text-ok', label: 'Resolved' },
  scale: { icon: Scaling, tone: 'text-aurora', label: 'Scaling' },
  config: { icon: Settings2, tone: 'text-muted', label: 'Config' },
  alert: { icon: Bell, tone: 'text-warn', label: 'Alert' },
}

export default function EventFeed({ limit = 6 }) {
  return (
    <ol className="space-y-3">
      {events.slice(0, limit).map((e) => {
        const meta = TYPES[e.type]
        const EventIcon = meta.icon
        return (
          <li key={`${e.time}-${e.text}`} className="flex gap-3">
            <EventIcon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.tone}`} aria-label={meta.label} />
            <div className="min-w-0">
              <p className="text-sm leading-snug">{e.text}</p>
              <p className="mt-0.5 text-xs text-faint">{e.time}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
