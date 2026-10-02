import Section from '../ui/Section'
import { testimonials } from '../../data/mock'

const initials = (name) => name.split(' ').map((p) => p[0]).join('')

function Person({ t }) {
  return (
    <figcaption className="mt-5 flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-raised text-xs font-semibold" aria-hidden="true">{initials(t.name)}</span>
      <span>
        <span className="block text-sm font-semibold">{t.name}</span>
        <span className="block text-xs text-muted">{t.role}</span>
      </span>
    </figcaption>
  )
}

export default function Testimonials() {
  const [lead, ...rest] = testimonials
  return (
    <Section border>
      <p className="mb-8 text-sm text-faint">Quotes from fictional customers, written for this demo.</p>
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <figure>
          <blockquote className="metal-text font-display text-[clamp(1.5rem,3vw,2.15rem)] font-medium leading-[1.25] tracking-tight">
            {lead.quote}
          </blockquote>
          <Person t={lead} />
        </figure>
        <div className="space-y-8 lg:border-l lg:border-line lg:pl-10">
          {rest.map((t) => (
            <figure key={t.name}>
              <blockquote className="text-[15px] leading-relaxed">{t.quote}</blockquote>
              <Person t={t} />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
