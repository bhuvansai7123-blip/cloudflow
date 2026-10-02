import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/shared/PageHeader'
import Section, { SectionHeading } from '../components/ui/Section'
import PricingCards from '../components/shared/PricingCards'
import FaqList from '../components/shared/FaqList'
import { faqs } from '../data/mock'

export default function Pricing() {
  useDocumentMeta({
    title: 'Pricing',
    description: 'CloudFlow demo pricing: Starter at $0, Pro at $29 and Scale at $99 per month. Demo interface only, no payments.',
    path: '/pricing',
  })
  return (
    <>
      <PageHeader title="Pricing that starts at zero." description="Pick a plan and switch billing periods. This is a demo interface, so nothing is ever charged." />
      <Section>
        <PricingCards />
      </Section>
      <Section border>
        <SectionHeading title="Pricing questions" />
        <FaqList items={faqs.filter((f) => f.category === 'Pricing' || f.category === 'Teams')} />
      </Section>
    </>
  )
}
