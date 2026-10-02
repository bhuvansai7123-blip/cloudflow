import { Activity, LayoutDashboard, Server, Sparkles, TriangleAlert } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Sparkline from '../ui/Sparkline'
import StatusDot from '../ui/StatusDot'
import { LogoMark } from '../ui/Logo'
import IncidentChart from './IncidentChart'
import { baselineLatency, metricSeries, overviewStats, peakLatency } from '../../data/mock'

const SIDEBAR = [LayoutDashboard, Activity, TriangleAlert, Server]
const KPI_IDS = ['latency', 'requests', 'errors']

function HeroProduct() {
  const rise = Math.round(((peakLatency - baselineLatency) / baselineLatency) * 100)
  const kpis = KPI_IDS.map((id) => overviewStats.find((s) => s.id === id))

  return (
    <div className="metal metal overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]">
      <div className="flex">
        <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-line py-4 sm:flex" aria-hidden="true">
          <LogoMark size={24} />
          <div className="mt-3 flex flex-col gap-1">
            {SIDEBAR.map((SideIcon, i) => (
              <span key={i} className={`grid h-9 w-9 place-items-center rounded-lg ${i === 0 ? 'bg-raised text-ink' : 'text-faint'}`}>
                <SideIcon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Overview</p>
            <p className="flex items-center gap-2 text-xs text-muted">
              <StatusDot tone="ok" pulse /> Live, production
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {kpis.map((k) => (
              <div key={k.id} className="rounded-lg border border-line p-2.5 sm:p-3">
                <p className="truncate text-[11px] text-faint">{k.short}</p>
                <p className="mt-1 font-display text-lg font-semibold tabular-nums sm:text-xl">
                  {k.value}
                  <span className="ml-0.5 text-xs font-medium text-muted">{k.unit}</span>
                </p>
                <div className="mt-1.5">
                  <Sparkline values={metricSeries.slice(-24).map((p) => p[k.spark])} height={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <IncidentChart data={metricSeries} />
          </div>

          <div className="fade-in-late mt-4 flex gap-3 rounded-lg border border-line bg-raised/50 p-3.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-medium leading-snug">
                Advisor: checkout-api latency rose {rise}% after the v2.14.0 deploy.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Database connections hit 20 of 20. Raising the pool to 40 should bring p95 back under 150 ms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="container-x grid items-center gap-12 pb-20 pt-12 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6.4fr)] lg:gap-14 lg:pb-28">
        <div>
          <Badge className="px-3 py-1 text-[13px]">AI-powered cloud observability</Badge>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.1rem)] font-semibold leading-[1.02]">
            Monitor your cloud infrastructure with AI.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            CloudFlow helps teams understand infrastructure health, detect unusual activity, and turn monitoring data into actions they can take today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/product" size="lg">Start Free</Button>
            <Button to="/product" variant="secondary" size="lg">Explore Demo</Button>
          </div>
          <p className="mt-5 text-sm text-faint">Free plan. No card needed. Demo project with mock data.</p>
        </div>
        <div className="lg:-mr-16">
          <HeroProduct />
        </div>
      </div>
    </section>
  )
}
