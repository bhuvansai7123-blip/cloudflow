import StatusDot from '../ui/StatusDot'
import { services, STATUS_META } from '../../data/mock'

const STATUS_TEXT = { ok: 'text-ok', warn: 'text-warn', bad: 'text-bad' }

/** One table for every size. Less important columns are hidden on small screens instead of scrolling sideways. */
export default function ServiceHealth({ limit, onViewAll }) {
  const rows = limit ? services.slice(0, limit) : services
  return (
    <div>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Service health</caption>
        <thead className="text-xs text-faint">
          <tr className="border-b border-line">
            <th scope="col" className="pb-2.5 font-medium">Service</th>
            <th scope="col" className="hidden pb-2.5 font-medium md:table-cell">Region</th>
            <th scope="col" className="pb-2.5 font-medium">Status</th>
            <th scope="col" className="pb-2.5 text-right font-medium">Latency</th>
            <th scope="col" className="hidden pb-2.5 text-right font-medium sm:table-cell">Errors</th>
            <th scope="col" className="hidden pb-2.5 text-right font-medium md:table-cell">Uptime</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line/70">
          {rows.map((s) => {
            const meta = STATUS_META[s.status]
            return (
              <tr key={s.name} className="hover:bg-raised/40">
                <th scope="row" className="py-2.5 pr-3 font-medium">{s.name}</th>
                <td className="hidden py-2.5 pr-3 text-muted md:table-cell">{s.region}</td>
                <td className="py-2.5 pr-3">
                  <span className={`flex items-center gap-2 text-xs font-medium ${STATUS_TEXT[meta.tone]}`}>
                    <StatusDot tone={meta.tone} />
                    {meta.label}
                  </span>
                </td>
                <td className="py-2.5 text-right tabular-nums">{s.latency} ms</td>
                <td className="hidden py-2.5 text-right tabular-nums sm:table-cell">{s.errors.toFixed(2)}%</td>
                <td className="hidden py-2.5 text-right tabular-nums md:table-cell">{s.uptime}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {limit && onViewAll && (
        <button type="button" onClick={onViewAll} className="mt-3 text-xs font-medium text-flow hover:underline">
          View all {services.length} services
        </button>
      )}
    </div>
  )
}
