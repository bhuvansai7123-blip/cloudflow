import Icon from '../ui/Icon'
import { trustedBy } from '../../data/mock'

export default function LogoCloud() {
  return (
    <section className="border-y border-line/70 py-9" aria-label="Trusted by">
      <div className="container-x flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <p className="shrink-0 text-sm text-muted">Trusted by engineering teams at (fictional) companies</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-faint">
          {trustedBy.map((c) => (
            <li key={c.name} className="flex items-center gap-2">
              <Icon name={c.icon} className="h-4 w-4" />
              <span className="font-display text-base font-semibold tracking-tight">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
