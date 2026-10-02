import { useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/shared/PageHeader'
import Section from '../components/ui/Section'
import Tabs from '../components/ui/Tabs'
import FaqList from '../components/shared/FaqList'
import { faqCategories, faqs } from '../data/mock'

const tabs = faqCategories.map((c) => ({ id: c, label: c }))

export default function Faq() {
  const [category, setCategory] = useState('All')
  useDocumentMeta({
    title: 'FAQ',
    description: 'Answers about how CloudFlow works, AI recommendations, security, integrations, pricing and team usage.',
    path: '/faq',
  })
  const items = category === 'All' ? faqs : faqs.filter((f) => f.category === category)

  return (
    <>
      <PageHeader title="Frequently asked questions." description="Quick answers about how CloudFlow works, what the AI does, and how teams use it." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Tabs tabs={tabs} value={category} onChange={setCategory} label="FAQ categories" idPrefix="faq" />
          <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-${category}`}>
            <FaqList key={category} items={items} />
          </div>
        </div>
      </Section>
    </>
  )
}
