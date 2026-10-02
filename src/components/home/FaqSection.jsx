import Button from '../ui/Button'
import Section, { SectionHeading } from '../ui/Section'
import FaqList from '../shared/FaqList'
import { faqs } from '../../data/mock'

export default function FaqSection() {
  return (
    <Section border>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
        <SectionHeading title="Questions, answered." description="The full FAQ also covers security, integrations and teams." className="mb-0" />
        <div>
          <FaqList items={faqs.slice(0, 5)} />
          <Button to="/faq" variant="ghost" className="mt-5 -ml-3">See all questions</Button>
        </div>
      </div>
    </Section>
  )
}
