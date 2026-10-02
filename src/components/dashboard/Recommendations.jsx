import { Sparkles } from 'lucide-react'
import Badge from '../ui/Badge'
import { recommendations } from '../../data/mock'

export default function Recommendations() {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {recommendations.map((r) => (
        <li key={r.id} className="flex gap-3 rounded-lg border border-line bg-bg/40 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium leading-snug">{r.title}</p>
            <p className="mt-1 text-sm text-muted">{r.reason}</p>
            <Badge tone={r.tone} className="mt-2.5">{r.impact}</Badge>
          </div>
        </li>
      ))}
    </ul>
  )
}
