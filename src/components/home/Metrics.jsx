import Section from '../ui/Section'
import { metrics } from '../../data/mock'

export default function Metrics() {
  return (
    <Section border tight>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <dd className="metal-text font-display text-3xl font-semibold tabular-nums sm:text-4xl">{m.value}</dd>
            <dt className="mt-1 text-sm text-muted">{m.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-xs text-faint">Figures are made up for this demo.</p>
    </Section>
  )
}
