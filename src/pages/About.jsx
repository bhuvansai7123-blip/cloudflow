import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/shared/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'
import Badge from '../components/ui/Badge'
import { companyStats, principles, team } from '../data/mock'
import { DEMO_NOTE } from '../lib/constants'

const initials = (name) => name.split(' ').map((p) => p[0]).join('')

export default function About() {
  useDocumentMeta({
    title: 'About',
    description: 'Learn about the CloudFlow mission, philosophy and fictional team. CloudFlow is a demo company created for a portfolio project.',
    path: '/about',
  })
  return (
    <>
      <PageHeader title="We make cloud monitoring understandable." description="CloudFlow exists so a small team can run production with the confidence of a much larger one.">
        <Badge tone="warn" className="mt-6">Fictional company for a portfolio demo</Badge>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Give every developer a clear picture of their cloud, and a clear next step when something goes wrong.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Why we exist</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Monitoring tools got powerful but also complicated. Small teams ended up with more charts than answers. CloudFlow brings the answers forward and keeps the charts as proof.
            </p>
          </div>
        </div>
      </Section>

      <Section border>
        <SectionHeading title="How we think about the product" />
        <ul className="grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title}>
              <Card className="h-full p-6">
                <Icon name={p.icon} className="h-6 w-6 text-flow" />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section border>
        <SectionHeading title="The team" description="Everyone below is fictional, created for this demo." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name}>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-raised font-display text-base font-semibold" aria-hidden="true">
                  {initials(m.name)}
                </span>
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section border>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {companyStats.map((s) => (
            <div key={s.label}>
              <dd className="metal-text font-display text-3xl font-semibold tabular-nums sm:text-4xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-sm text-faint">{DEMO_NOTE}</p>
      </Section>
    </>
  )
}
