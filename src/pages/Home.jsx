import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/home/Hero'
import LogoCloud from '../components/home/LogoCloud'
import IncidentStory from '../components/home/IncidentStory'
import FeatureBento from '../components/home/FeatureBento'
import AdvisorSection from '../components/home/AdvisorSection'
import Metrics from '../components/home/Metrics'
import Testimonials from '../components/home/Testimonials'
import PricingPreview from '../components/home/PricingPreview'
import FaqSection from '../components/home/FaqSection'
import FinalCta from '../components/shared/FinalCta'

export default function Home() {
  useDocumentMeta({
    title: '',
    description: 'Monitor your cloud infrastructure with AI-powered insights. CloudFlow is a fictional SaaS demo built with React, Vite, Tailwind CSS and Recharts.',
    path: '/',
  })
  return (
    <>
      <Hero />
      <LogoCloud />
      <IncidentStory />
      <FeatureBento />
      <AdvisorSection />
      <Metrics />
      <Testimonials />
      <PricingPreview />
      <FaqSection />
      <FinalCta />
    </>
  )
}
