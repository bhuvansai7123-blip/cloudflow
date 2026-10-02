import Sparkline from '../ui/Sparkline'
import { metricSeries } from '../../data/mock'

const toneText = { ok: 'text-ok', warn: 'text-warn', bad: 'text-bad', flow: 'text-flow' }
const toneStroke = { ok: 'stroke-ok', warn: 'stroke-warn', bad: 'stroke-bad', flow: 'stroke-muted' }

export default function StatCard({ label, value, unit, delta, tone = 'ok', spark, className = '' }) {
  return (
    <div className={`metal metal rounded-xl border border-line bg-surface p-4 ${className}`}>
      <p className="text-xs text-muted">{label}</p>
      <p className="metal-text mt-2 font-display text-[1.75rem] font-semibold leading-none tabular-nums">
        {value}
        {unit && <span className="ml-1 text-sm font-medium text-muted">{unit}</span>}
      </p>
      <p className={`mt-2 text-xs font-medium ${toneText[tone]}`}>{delta}</p>
      {spark && (
        <div className="mt-3">
          <Sparkline values={metricSeries.slice(-24).map((p) => p[spark])} className={toneStroke[tone]} />
        </div>
      )}
    </div>
  )
}
