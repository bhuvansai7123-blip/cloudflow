import Button from '../ui/Button'
import Section from '../ui/Section'
import AdvisorChat from '../advisor/AdvisorChat'

const points = [
  ['Plain-English answers', 'No query language. Ask the way you would ask a teammate.'],
  ['Shows its sources', 'Every answer lists the metrics and events it used.'],
  ['Suggests, never changes', 'You decide what happens next. The Advisor only reads data.'],
]

export default function AdvisorSection() {
  return (
    <Section border>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.85rem,3.6vw,2.65rem)] font-semibold leading-[1.1]">Ask your infrastructure what happened.</h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">
            The AI Cloud Advisor reads metrics, deploys and incidents together, then answers like a teammate who has already looked at the graphs.
          </p>
          <dl className="mt-8 space-y-5">
            {points.map(([title, body]) => (
              <div key={title}>
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-0.5 text-[15px] text-muted">{body}</dd>
              </div>
            ))}
          </dl>
          <Button to="/advisor" variant="secondary" className="mt-8">Open the full Advisor</Button>
        </div>
        <AdvisorChat compact />
      </div>
    </Section>
  )
}
