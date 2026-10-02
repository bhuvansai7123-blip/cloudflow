import { useMemo, useState } from 'react'
import { ChartNoAxesCombined, LayoutDashboard, Server, TriangleAlert } from 'lucide-react'
import Segmented from '../ui/Segmented'
import Tabs from '../ui/Tabs'
import StatusDot from '../ui/StatusDot'
import { LogoMark } from '../ui/Logo'
import AdvisorChat from '../advisor/AdvisorChat'
import Panel from './Panel'
import StatCard from './StatCard'
import MetricChart from './MetricChart'
import ServiceHealth from './ServiceHealth'
import IncidentList from './IncidentList'
import EventFeed from './EventFeed'
import Recommendations from './Recommendations'
import { latestPoint, overviewStats, RANGES, sliceRange } from '../../data/mock'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'performance', label: 'Performance', icon: ChartNoAxesCombined },
  { id: 'incidents', label: 'Incidents', icon: TriangleAlert, badge: 2 },
  { id: 'services', label: 'Services', icon: Server },
]

const SUBTITLES = {
  overview: '2 active incidents. checkout-api is degraded.',
  performance: 'How fast and how busy your services are.',
  incidents: 'Everything that happened in the last 24 hours.',
  services: '8 services across 3 regions.',
}

const METRICS = [
  { id: 'latency', label: 'Response time', name: 'Response time (p95)', unit: ' ms', color: 'flow' },
  { id: 'requests', label: 'Requests', name: 'Requests per minute', unit: '', color: 'aurora' },
  { id: 'cpu', label: 'CPU', name: 'CPU usage', unit: '%', color: 'warn' },
  { id: 'memory', label: 'Memory', name: 'Memory usage', unit: '%', color: 'ok' },
]
const P50 = { key: 'p50', name: 'Response time (p50)' }

export default function Dashboard() {
  const [tab, setTab] = useState('overview')
  const [range, setRange] = useState('24h')
  const [metric, setMetric] = useState('latency')
  const data = useMemo(() => sliceRange(range), [range])
  const active = METRICS.find((m) => m.id === metric)
  const tabLabel = TABS.find((t) => t.id === tab).label

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/40 lg:grid lg:grid-cols-[216px_minmax(0,1fr)]">
      <aside className="border-b border-line lg:border-b-0 lg:border-r">
        <div className="hidden items-center gap-2.5 border-b border-line px-5 py-4 lg:flex">
          <LogoMark size={24} />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Acme Cloud</p>
            <p className="text-xs text-faint">production</p>
          </div>
        </div>
        <Tabs tabs={TABS} value={tab} onChange={setTab} label="Dashboard sections" idPrefix="dash" variant="sidebar" />
      </aside>

      <div className="min-w-0 space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">{tabLabel}</h1>
            <p className="mt-0.5 text-sm text-muted">{SUBTITLES[tab]}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden items-center gap-2 text-xs text-muted sm:flex">
              <StatusDot tone="ok" pulse /> Live, updated {latestPoint.time}
            </p>
            <Segmented options={RANGES} value={range} onChange={setRange} label="Time range" size="sm" />
          </div>
        </div>

        <div id="dash-panel" role="tabpanel" aria-labelledby={`dash-${tab}`} className="space-y-4">
          {tab === 'overview' && (
            <>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {overviewStats.map((s, i) => (
                  <StatCard key={s.id} {...s} className={i === 0 ? 'col-span-2 lg:col-span-1' : ''} />
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <Panel
                  title={active.name}
                  subtitle={metric === 'latency' ? 'Dashed line is p50. Shaded area is incident INC-2041.' : 'Shaded area is incident INC-2041.'}
                  className="xl:col-span-2"
                  action={<Segmented options={METRICS} value={metric} onChange={setMetric} label="Chart metric" size="sm" />}
                >
                  <MetricChart
                    data={data}
                    dataKey={active.id}
                    name={active.name}
                    unit={active.unit}
                    color={active.color}
                    height={290}
                    showIncident
                    showDeploys
                    secondary={metric === 'latency' ? P50 : undefined}
                  />
                </Panel>
                <AdvisorChat compact useDashboardLabels />
              </div>

              <Panel title="Resource usage">
                <div className="grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
                  {[
                    { key: 'cpu', name: 'CPU usage', unit: '%', color: 'warn' },
                    { key: 'memory', name: 'Memory usage', unit: '%', color: 'ok' },
                    { key: 'requests', name: 'Request volume', unit: '', color: 'aurora' },
                  ].map((m) => (
                    <div key={m.key} className="md:px-5 md:first:pl-0 md:last:pr-0">
                      <p className="flex items-baseline justify-between text-xs text-muted">
                        {m.name}
                        <span className="text-sm font-semibold tabular-nums text-ink">
                          {latestPoint[m.key].toLocaleString('en-US')}
                          {m.unit}
                        </span>
                      </p>
                      <MetricChart data={data} dataKey={m.key} name={m.name} unit={m.unit} color={m.color} height={120} />
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="grid gap-4 xl:grid-cols-3">
                <Panel title="Service health" className="xl:col-span-2">
                  <ServiceHealth limit={5} onViewAll={() => setTab('services')} />
                </Panel>
                <Panel title="Active incidents">
                  <IncidentList onlyActive />
                </Panel>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <Panel title="Recent events">
                  <EventFeed />
                </Panel>
                <Panel title="AI recommendations" className="xl:col-span-2">
                  <Recommendations />
                </Panel>
              </div>
            </>
          )}

          {tab === 'performance' && (
            <div className="grid gap-4 md:grid-cols-2">
              {METRICS.map((m) => (
                <Panel key={m.id} title={m.name}>
                  <MetricChart data={data} dataKey={m.id} name={m.name} unit={m.unit} color={m.color} height={230} showIncident={m.id === 'latency' || m.id === 'cpu'} showDeploys={m.id === 'latency'} />
                </Panel>
              ))}
            </div>
          )}

          {tab === 'incidents' && (
            <div className="grid gap-4 xl:grid-cols-3">
              <Panel title="All incidents" className="xl:col-span-2">
                <IncidentList detailed />
              </Panel>
              <Panel title="Recent events">
                <EventFeed limit={8} />
              </Panel>
            </div>
          )}

          {tab === 'services' && (
            <Panel title="All services">
              <ServiceHealth />
            </Panel>
          )}
        </div>
      </div>
    </div>
  )
}
