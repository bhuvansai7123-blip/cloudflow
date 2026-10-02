import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/shared/PageHeader'
import Section from '../components/ui/Section'
import FeatureGrid from '../components/shared/FeatureGrid'
import FinalCta from '../components/shared/FinalCta'

export default function Features() {
  useDocumentMeta({
    title: 'Features',
    description: 'Explore CloudFlow features: AI Cloud Advisor, real-time monitoring, incident detection, analytics, health scores, collaboration, reports and alerts.',
    path: '/features',
  })
  return (
    <>
      <PageHeader title="Eight tools that make monitoring feel simple." description="Each one is built to answer a real question: what is wrong, why, and what should we do next." />
      <Section tight>
        <FeatureGrid />
      </Section>
      <FinalCta />
    </>
  )
}
