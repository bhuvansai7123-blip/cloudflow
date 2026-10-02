import { useState } from 'react'
import { Check } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Segmented from '../ui/Segmented'
import { useToast } from '../../context/ToastContext'
import { plans } from '../../data/mock'

const BILLING = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly (save 20%)' },
]

export default function PricingCards({ compact = false }) {
  const [billing, setBilling] = useState('monthly')
  const [loadingId, setLoadingId] = useState(null)
  const toast = useToast()

  const choose = (plan) => {
    setLoadingId(plan.id)
    setTimeout(() => {
      setLoadingId(null)
      toast(`${plan.name} plan selected. Pricing is a demo, so nothing was charged.`, 'success')
    }, 900)
  }

  return (
    <div>
      {!compact && (
        <div className="mb-8">
          <Segmented options={BILLING} value={billing} onChange={setBilling} label="Billing period" />
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = plan[billing]
          return (
            <Card
              key={plan.id}
              className={`flex flex-col p-6 sm:p-7 ${
                plan.highlighted ? 'border-ink/40 bg-raised/60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.highlighted && <Badge>Most popular</Badge>}
              </div>
              <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="metal-text font-display text-5xl font-semibold tabular-nums tracking-tight">${price}</span>
                <span className="text-sm text-muted">/month{billing === 'yearly' && price > 0 ? ', billed yearly' : ''}</span>
              </p>

              <Button
                variant={plan.highlighted ? 'primary' : 'secondary'}
                className="mt-6 w-full"
                loading={loadingId === plan.id}
                onClick={() => choose(plan)}
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm">
                {plan.limits.map((l) => (
                  <li key={l} className="font-medium">{l}</li>
                ))}
              </ul>
              {!compact && (
                <ul className="mt-5 space-y-2.5 text-sm text-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )
        })}
      </div>
      <p className="mt-5 text-sm text-faint">Demo pricing only. No payments are taken on this site.</p>
    </div>
  )
}
