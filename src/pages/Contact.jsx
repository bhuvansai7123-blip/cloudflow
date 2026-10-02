import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/shared/PageHeader'
import Section from '../components/ui/Section'
import ContactForm from '../components/shared/ContactForm'
import DemoButton from '../components/ui/DemoButton'

const socials = [
  { icon: Twitter, label: 'CloudFlow on X' },
  { icon: Linkedin, label: 'CloudFlow on LinkedIn' },
  { icon: Github, label: 'CloudFlow on GitHub' },
]

export default function Contact() {
  useDocumentMeta({
    title: 'Contact',
    description: 'Contact the CloudFlow team. This is a demo form that validates input and shows a success state without sending any data.',
    path: '/contact',
  })
  return (
    <>
      <PageHeader title="Talk to the CloudFlow team." description="Tell us what you are building. In this demo the form checks your input and shows a success message, but sends nothing." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <aside className="space-y-6" aria-label="Contact information">
            <div>
              <h2 className="text-lg font-semibold">Contact information</h2>
              <ul className="mt-4 space-y-4 text-[15px] text-muted">
                <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-flow" aria-hidden="true" />hello@cloudflow.example</li>
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-flow" aria-hidden="true" />100 Example Street, Demo City</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Follow along</h2>
              <div className="mt-3 flex gap-1.5">
                {socials.map(({ icon: SocialIcon, label }) => (
                  <DemoButton key={label} message="Social profiles are fictional in this demo." aria-label={label} className="rounded-lg border border-line p-3 text-muted transition hover:border-flow/60 hover:text-ink">
                    <SocialIcon className="h-5 w-5" aria-hidden="true" />
                  </DemoButton>
                ))}
              </div>
            </div>
            <p className="text-sm text-faint">The email address and street above are placeholders and do not exist.</p>
          </aside>
        </div>
      </Section>
    </>
  )
}
