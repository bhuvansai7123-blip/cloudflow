import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Section, { SectionHeading } from '../ui/Section'
import FeatureVisual from '../shared/FeatureVisual'
import { features } from '../../data/mock'

// Which feature goes where, and how wide it is on large screens
const LAYOUT = [
  { id: 'monitoring', span: 'lg:col-span-4', large: true },
  { id: 'health', span: 'lg:col-span-2' },
  { id: 'incidents', span: 'lg:col-span-2' },
  { id: 'analytics', span: 'lg:col-span-2' },
  { id: 'alerts', span: 'lg:col-span-2' },
]

export default function FeatureBento() {
  return (
    <Section border>
      <SectionHeading title="Everything you need to run calmly in production." description="The tools behind the daily work of keeping services healthy." />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {LAYOUT.map(({ id, span, large }) => {
          const f = features.find((x) => x.id === id)
          return (
            <li key={id} className={`metal metal flex flex-col rounded-2xl border border-line bg-surface p-6 ${span}`}>
              <Icon name={f.icon} className="h-5 w-5 text-flow" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 max-w-[44ch] flex-1 text-[15px] leading-relaxed text-muted">{f.description}</p>
              <div className="mt-6 rounded-lg border border-line bg-bg/60 p-3.5">
                <FeatureVisual id={id} large={large} />
              </div>
            </li>
          )
        })}
      </ul>
      <Button to="/features" variant="secondary" className="mt-8">See all 8 features</Button>
    </Section>
  )
}
