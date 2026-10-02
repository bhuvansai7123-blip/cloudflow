import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import { incidentStory } from '../../data/mock'

const DOT = { neutral: 'bg-faint', warn: 'bg-warn', bad: 'bg-bad', flow: 'bg-flow', ok: 'bg-ok' }

export default function IncidentStory() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 className="text-[clamp(1.85rem,3.6vw,2.65rem)] font-semibold leading-[1.1]">One incident, explained in order.</h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">
            Most tools send a flood of alerts and leave the detective work to you. CloudFlow tells you what changed, what it affects and what to try first.
          </p>
          <dl className="mt-8 flex gap-10">
            <div>
              <dd className="metal-text font-display text-3xl font-semibold tabular-nums">47 to 1</dd>
              <dt className="mt-1 text-sm text-muted">alerts grouped into one incident</dt>
            </div>
            <div>
              <dd className="metal-text font-display text-3xl font-semibold tabular-nums">8 min</dd>
              <dt className="mt-1 text-sm text-muted">from deploy to likely cause</dt>
            </div>
          </dl>
          <Button to="/product" variant="secondary" className="mt-8">See it in the dashboard</Button>
        </div>

        <Reveal>
          <ol className="relative space-y-7 border-l border-line pl-7">
            {incidentStory.map((step) => (
              <li key={step.time} className="relative">
                <span className={`absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg ${DOT[step.tone]}`} aria-hidden="true" />
                <p className="text-xs font-medium tabular-nums text-faint">{step.time}</p>
                <h3 className="mt-0.5 text-lg font-semibold leading-snug">{step.title}</h3>
                <p className="mt-1 max-w-[50ch] text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
      <p className="mt-10 text-xs text-faint">A fictional example using the demo data.</p>
    </Section>
  )
}
