import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import Logo from '../ui/Logo'
import DemoButton from '../ui/DemoButton'
import { DEMO_NOTE } from '../../lib/constants'

const columns = [
  {
    title: 'Product',
    items: [
      { to: '/product', label: 'Dashboard' },
      { to: '/features', label: 'Features' },
      { to: '/advisor', label: 'AI Cloud Advisor' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    items: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { demo: 'Careers pages are not part of the demo.', label: 'Careers' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { to: '/faq', label: 'FAQ' },
      { demo: 'Documentation is not part of the demo.', label: 'Documentation' },
      { demo: 'The status page is not part of the demo.', label: 'Status' },
    ],
  },
]

const socials = [
  { icon: Twitter, label: 'CloudFlow on X' },
  { icon: Linkedin, label: 'CloudFlow on LinkedIn' },
  { icon: Github, label: 'CloudFlow on GitHub' },
  { icon: Youtube, label: 'CloudFlow on YouTube' },
]

const itemClass = 'text-sm text-muted transition hover:text-ink'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Cloud intelligence, without the complexity. Monitor your infrastructure with AI-powered insights.
            </p>
            <div className="mt-5 flex gap-1.5">
              {socials.map(({ icon: SocialIcon, label }) => (
                <DemoButton
                  key={label}
                  message="Social profiles are fictional in this demo."
                  aria-label={label}
                  className="rounded-lg p-2.5 text-muted transition hover:bg-raised hover:text-ink"
                >
                  <SocialIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                </DemoButton>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className={itemClass}>
                        {item.label}
                      </Link>
                    ) : (
                      <DemoButton message={item.demo} className={itemClass}>
                        {item.label}
                      </DemoButton>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-xs leading-relaxed">
            <strong className="font-semibold text-ink">Demo disclaimer.</strong> {DEMO_NOTE}
          </p>
          <div className="flex items-center gap-5">
            <span>&copy; 2026 CloudFlow</span>
            <DemoButton message="Privacy policy is not part of the demo." className={itemClass}>
              Privacy
            </DemoButton>
            <DemoButton message="Terms are not part of the demo." className={itemClass}>
              Terms
            </DemoButton>
          </div>
        </div>
      </div>
    </footer>
  )
}
