import Button from '../ui/Button'
import Section, { SectionHeading } from '../ui/Section'
import PricingCards from '../shared/PricingCards'

export default function PricingPreview() {
  return (
    <Section border>
      <SectionHeading title="Start free. Upgrade when your team grows." />
      <PricingCards compact />
      <Button to="/pricing" variant="ghost" className="mt-6 -ml-3">Compare all plan details</Button>
    </Section>
  )
}
