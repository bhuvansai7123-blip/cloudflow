/* Centralised mock data. Everything here is fictional. */

/* ---------- Time series (48 half-hour points, 19:00 yesterday to 18:30 now) ---------- */
function rng(seed) {
  return function next() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const pad = (n) => String(n).padStart(2, '0')
const clock = (i) => {
  const m = (19 * 60 + i * 30) % 1440
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
}

// Extra load around the 14:05 deploy (indexes 38 to 43 are 14:00 to 16:30)
const SPIKE = { 38: 0.55, 39: 1.5, 40: 1.8, 41: 1.2, 42: 0.5, 43: 0.2 }

export const metricSeries = (() => {
  const r = rng(7)
  return Array.from({ length: 48 }, (_, i) => {
    const hour = ((19 * 60 + i * 30) % 1440) / 60
    const day = Math.max(0, Math.sin(((hour - 6) / 16) * Math.PI))
    const spike = SPIKE[i] ?? 0
    const latency = Math.round(104 + day * 22 + spike * 120 + r() * 9)
    return {
      time: clock(i),
      latency,
      p50: Math.round(latency * 0.56),
      requests: Math.round(7800 + day * 5600 + r() * 500 - spike * 400),
      cpu: Math.round(31 + day * 10 + spike * 24 + r() * 3),
      memory: Math.round(52 + i * 0.38 + r() * 1.2),
      errors: Number((0.12 + spike * 0.9 + r() * 0.06).toFixed(2)),
    }
  })
})()

export const RANGES = [
  { id: '6h', label: '6h', points: 12 },
  { id: '12h', label: '12h', points: 24 },
  { id: '24h', label: '24h', points: 48 },
]

export const sliceRange = (rangeId) => {
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[2]
  return metricSeries.slice(-range.points)
}

export const INCIDENT_WINDOW = { from: '14:00', to: '16:00' }

// Deploys drawn as vertical markers on charts (snapped to the nearest half hour)
export const DEPLOYS = [
  { time: '11:00', label: 'auth v5.3.1' },
  { time: '14:00', label: 'checkout v2.14.0' },
]

const latencies = metricSeries.map((p) => p.latency)
export const latestPoint = metricSeries[metricSeries.length - 1]
export const peakLatency = Math.max(...latencies)
export const baselineLatency = Math.round(
  metricSeries.slice(20, 36).reduce((sum, p) => sum + p.latency, 0) / 16,
)
export const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)

/* A short live-looking series for the hero preview */
export const heroSeed = (() => {
  const r = rng(21)
  return Array.from({ length: 36 }, (_, i) => 118 + Math.sin(i / 3) * 9 + r() * 10)
})()

/* ---------- Overview stats ---------- */
const pct = (now, base) => Math.round(((now - base) / base) * 100)

export const overviewStats = [
  { id: 'health', label: 'Infrastructure health', value: '94', unit: '/100', delta: 'Stable', tone: 'ok', icon: 'HeartPulse', short: 'Health' },
  { id: 'latency', label: 'Response time (p95)', value: String(latestPoint.latency), unit: 'ms', delta: `${pct(latestPoint.latency, avgLatency)}% vs 24h avg`, tone: latestPoint.latency <= avgLatency ? 'ok' : 'warn', icon: 'Gauge', short: 'p95', spark: 'latency' },
  { id: 'requests', label: 'Requests per minute', value: latestPoint.requests.toLocaleString('en-US'), unit: '', delta: '+4% vs yesterday', tone: 'ok', icon: 'Activity', short: 'Requests/min', spark: 'requests' },
  { id: 'errors', label: 'Error rate', value: latestPoint.errors.toFixed(2), unit: '%', delta: 'Within target', tone: 'ok', icon: 'ShieldCheck', short: 'Errors', spark: 'errors' },
  { id: 'incidents', label: 'Active incidents', value: '2', unit: '', delta: '1 high, 1 medium', tone: 'warn', icon: 'TriangleAlert', short: 'Incidents' },
]

/* ---------- Services ---------- */
export const services = [
  { name: 'api-gateway', region: 'us-east-1', status: 'healthy', latency: 42, errors: 0.04, uptime: 99.99 },
  { name: 'checkout-api', region: 'us-east-1', status: 'degraded', latency: 188, errors: 0.61, uptime: 99.82 },
  { name: 'auth-service', region: 'us-east-1', status: 'healthy', latency: 58, errors: 0.02, uptime: 99.99 },
  { name: 'payments-worker', region: 'eu-west-1', status: 'warning', latency: 96, errors: 0.11, uptime: 99.95 },
  { name: 'search-service', region: 'eu-west-1', status: 'healthy', latency: 74, errors: 0.05, uptime: 99.98 },
  { name: 'postgres-primary', region: 'us-east-1', status: 'healthy', latency: 11, errors: 0.0, uptime: 99.99 },
  { name: 'redis-cache', region: 'us-east-1', status: 'healthy', latency: 3, errors: 0.0, uptime: 100 },
  { name: 'notifications', region: 'ap-south-1', status: 'healthy', latency: 120, errors: 0.07, uptime: 99.97 },
]

export const STATUS_META = {
  healthy: { label: 'Healthy', tone: 'ok' },
  warning: { label: 'Needs attention', tone: 'warn' },
  degraded: { label: 'Degraded', tone: 'bad' },
}

/* ---------- Incidents ---------- */
export const incidents = [
  {
    id: 'INC-2041',
    title: 'Checkout latency above 300 ms',
    service: 'checkout-api',
    severity: 'high',
    status: 'Monitoring',
    active: true,
    started: '14:05',
    summary: 'p95 response time passed 300 ms after the v2.14.0 deploy. A fix is rolling out and latency is falling.',
  },
  {
    id: 'INC-2042',
    title: 'Memory growing steadily on payments-worker',
    service: 'payments-worker',
    severity: 'medium',
    status: 'Investigating',
    active: true,
    started: '16:40',
    summary: 'Memory has climbed about 1.2% per hour since the last restart. No customer impact yet.',
  },
  {
    id: 'INC-2039',
    title: 'Elevated 5xx errors on notifications',
    service: 'notifications',
    severity: 'low',
    status: 'Resolved',
    active: false,
    started: '03:12',
    summary: 'A third-party email provider timed out for 11 minutes. Retries cleared the queue.',
  },
  {
    id: 'INC-2037',
    title: 'Slow queries on postgres-primary',
    service: 'postgres-primary',
    severity: 'medium',
    status: 'Resolved',
    active: false,
    started: '21:30',
    summary: 'A missing index on the orders table slowed reports. An index was added.',
  },
]

export const SEVERITY_TONE = { high: 'bad', medium: 'warn', low: 'flow' }

/* ---------- Recent events ---------- */
export const events = [
  { time: '18:22', type: 'scale', text: 'search-service scaled from 3 to 4 instances' },
  { time: '17:48', type: 'alert', text: 'Memory alert acknowledged on payments-worker' },
  { time: '16:40', type: 'incident', text: 'INC-2042 opened for payments-worker' },
  { time: '15:40', type: 'resolved', text: 'Latency back under 200 ms on checkout-api' },
  { time: '14:32', type: 'config', text: 'Retry limit lowered on checkout-api' },
  { time: '14:05', type: 'deploy', text: 'checkout-api v2.14.0 deployed to production' },
  { time: '11:15', type: 'deploy', text: 'auth-service v5.3.1 deployed to production' },
  { time: '03:12', type: 'incident', text: 'INC-2039 opened for notifications' },
]

/* ---------- AI recommendations shown on the dashboard ---------- */
export const recommendations = [
  { id: 'r1', title: 'Raise the checkout-api connection pool from 20 to 40', reason: 'The pool was full for 95 minutes while requests queued.', impact: 'High impact', tone: 'bad' },
  { id: 'r2', title: 'Inspect payments-worker for a memory leak', reason: 'Memory grows about 1.2% per hour and never drops after jobs finish.', impact: 'Medium impact', tone: 'warn' },
  { id: 'r3', title: 'Right-size search-service instances', reason: 'CPU averages 22%. Smaller instances could save about $140 per month.', impact: 'Saves cost', tone: 'ok' },
  { id: 'r4', title: 'Cache the /catalog response for 60 seconds', reason: '38% of requests ask for the same data within a minute.', impact: 'Saves load', tone: 'flow' },
]

/* ---------- AI Cloud Advisor (scripted demo answers) ---------- */
export const advisorQuestions = [
  { id: 'latency', label: 'Why did latency increase?', dashboardLabel: 'Why did response time increase?' },
  { id: 'attention', label: 'What services need attention?', dashboardLabel: 'What services need attention?' },
  { id: 'incidents', label: "Summarize today's incidents.", dashboardLabel: "Summarize today's incidents." },
  { id: 'reduce', label: 'How can I reduce resource usage?', dashboardLabel: 'How can I reduce resource usage?' },
]

export const advisorResponses = {
  latency: {
    summary: `Response time rose from a baseline of about ${baselineLatency} ms to a peak of ${peakLatency} ms between 14:00 and 16:00. One main cause and two contributing factors line up with that window.`,
    points: [
      { title: 'Deploy at 14:05', body: 'checkout-api v2.14.0 shipped, and p95 latency started climbing within 10 minutes.' },
      { title: 'Database pool was full', body: 'Connections sat at 20 of 20, so requests waited in a queue before reaching the database.' },
      { title: 'CPU pressure', body: 'checkout-api CPU rose from 41% to 84% while retries piled up.' },
    ],
    next: 'Raise the connection pool to 40 and watch p95 for 30 minutes. If it stays above 200 ms, roll back to v2.13.2.',
    sources: ['Response time', 'checkout-api CPU', 'Deploy log'],
  },
  attention: {
    summary: 'Two services need a look today. Everything else is healthy.',
    points: [
      { title: 'checkout-api (degraded)', body: 'Still slower than normal at 188 ms with a 0.61% error rate. It is recovering after the 14:05 deploy.' },
      { title: 'payments-worker (needs attention)', body: 'Memory has grown by about 1.2% per hour. At this pace it reaches 85% in roughly 12 hours.' },
    ],
    next: 'Fix the checkout-api pool first, then schedule a restart and a memory profile for payments-worker before tonight.',
    sources: ['Service health', 'Memory usage', 'Incident log'],
  },
  incidents: {
    summary: 'There were 4 incidents in the last 24 hours. 2 are active and 2 are resolved.',
    points: [
      { title: 'INC-2041, high, monitoring', body: 'Checkout latency above 300 ms after a deploy. A fix is rolling out.' },
      { title: 'INC-2042, medium, investigating', body: 'Memory growth on payments-worker. No customer impact so far.' },
      { title: 'INC-2039 and INC-2037, resolved', body: 'A provider timeout on notifications and a missing database index.' },
    ],
    next: 'Both active incidents trace back to resource limits. Reviewing pool sizes and memory settings could prevent repeats.',
    sources: ['Incident log', 'Recent events'],
  },
  reduce: {
    summary: 'I found three changes that lower usage without hurting performance.',
    points: [
      { title: 'Right-size search-service', body: 'CPU averages 22%. Moving to the next smaller instance saves about $140 per month.' },
      { title: 'Cache /catalog for 60 seconds', body: '38% of requests repeat within a minute, so caching can cut database load.' },
      { title: 'Scale notifications on a schedule', body: 'Traffic drops 70% overnight, so fewer instances will do from 22:00 to 06:00.' },
    ],
    next: 'Start with the cache. It is the quickest change and the lowest risk.',
    sources: ['CPU usage', 'Request volume', 'Cost estimate'],
  },
  fallback: {
    summary: 'This is a scripted demo, so I can only answer the suggested questions. Pick one below to see a sample answer.',
    points: [],
    next: '',
    sources: [],
  },
}

export function matchAdvisorQuestion(text) {
  const q = text.toLowerCase()
  if (/(latency|response|slow|speed)/.test(q)) return 'latency'
  if (/(attention|service|unhealthy|health)/.test(q)) return 'attention'
  if (/(incident|summar|outage)/.test(q)) return 'incidents'
  if (/(reduce|cost|resource|cpu|memory|save)/.test(q)) return 'reduce'
  return 'fallback'
}

/* ---------- Marketing content ---------- */
export const trustedBy = [
  { name: 'Lumenstack', icon: 'Hexagon' },
  { name: 'Orbitly', icon: 'Circle' },
  { name: 'Kestrel Labs', icon: 'Triangle' },
  { name: 'Vantora', icon: 'Diamond' },
  { name: 'Pinecrest', icon: 'Octagon' },
  { name: 'Helixforge', icon: 'Square' },
]

export const problems = [
  'Five dashboards open, and none of them agree',
  'Hundreds of alerts, but only a few that matter',
  'Hours spent guessing what changed before an incident',
  'Reports that someone has to build by hand every week',
]

export const solutions = [
  'One view of every service, region and deploy',
  'Alerts grouped by cause, so you see one problem once',
  'A plain-English explanation next to every spike',
  'Weekly reports written and sent for you',
]

export const incidentStory = [
  { time: '14:05', title: 'A deploy goes live', body: 'checkout-api v2.14.0 ships to production.', tone: 'neutral' },
  { time: '14:09', title: 'CloudFlow spots the change', body: 'p95 latency passes 200 ms. Nobody has opened a dashboard yet.', tone: 'warn' },
  { time: '14:12', title: '47 alerts become 1 incident', body: 'Alerts from three services are grouped into INC-2041.', tone: 'bad' },
  { time: '14:13', title: 'The Advisor explains why', body: 'It links the slowdown to the deploy and a database pool that is full, 20 of 20.', tone: 'flow' },
  { time: '14:32', title: 'The team acts', body: 'They lower the retry limit and queue the pool fix. Latency starts to fall.', tone: 'ok' },
]

export const features = [
  { id: 'advisor', icon: 'Sparkles', title: 'AI Cloud Advisor', description: 'Ask a question in plain English and get an answer based on your own metrics, deploys and incidents.' },
  { id: 'monitoring', icon: 'Activity', title: 'Real-time monitoring', description: 'Watch CPU, memory, latency and traffic update every few seconds across all your services.' },
  { id: 'incidents', icon: 'Radar', title: 'Incident detection', description: 'Unusual behavior is flagged early and grouped into one incident with a likely cause.' },
  { id: 'analytics', icon: 'ChartNoAxesCombined', title: 'Performance analytics', description: 'Compare releases, regions and time ranges to see exactly where things got faster or slower.' },
  { id: 'health', icon: 'HeartPulse', title: 'Infrastructure health', description: 'A single health score per service, based on errors, latency and saturation.' },
  { id: 'collab', icon: 'Users', title: 'Team collaboration', description: 'Assign incidents, leave notes on charts and share live views with your team.' },
  { id: 'reports', icon: 'FileText', title: 'Automated reports', description: 'Weekly summaries of uptime, incidents and costs, delivered to your inbox or Slack.' },
  { id: 'alerts', icon: 'BellRing', title: 'Custom alerts', description: 'Set your own thresholds and choose who is notified, and when, for each service.' },
]

export const metrics = [
  { value: '99.99%', label: 'Platform uptime' },
  { value: '4 min', label: 'Average time to find a cause' },
  { value: '63%', label: 'Fewer noisy alerts' },
  { value: '12,000+', label: 'Services monitored' },
]

export const testimonials = [
  { quote: 'We stopped jumping between five tabs during incidents. The Advisor points us at the deploy that caused it, and that alone saves us an hour.', name: 'Maya Okafor', role: 'Platform Lead, Orbitly' },
  { quote: 'Our alerts went from a wall of noise to a short list we actually read. On-call is a lot calmer now.', name: 'Daniel Reyes', role: 'CTO, Kestrel Labs' },
  { quote: 'The weekly report replaced a spreadsheet I used to build every Friday. It is clear enough to forward straight to leadership.', name: 'Aiko Tanaka', role: 'Site Reliability Engineer, Lumenstack' },
]

export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'For side projects and trying things out.',
    monthly: 0,
    yearly: 0,
    cta: 'Start free',
    highlighted: false,
    limits: ['Up to 5 services', '1 team member', '24-hour data history'],
    features: ['Real-time monitoring', 'Email alerts', '10 Advisor questions per month', 'Community support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    blurb: 'For small teams running production apps.',
    monthly: 29,
    yearly: 23,
    cta: 'Start Pro trial',
    highlighted: true,
    limits: ['Up to 25 services', '5 team members', '30-day data history'],
    features: ['Everything in Starter', 'Unlimited Advisor questions', 'Incident detection', 'Custom alerts for Slack and email', 'Automated weekly reports'],
  },
  {
    id: 'scale',
    name: 'Scale',
    blurb: 'For growing engineering teams.',
    monthly: 99,
    yearly: 79,
    cta: 'Talk to sales',
    highlighted: false,
    limits: ['Unlimited services', '25 team members', '12-month data history'],
    features: ['Everything in Pro', 'Advanced performance analytics', 'Single sign-on', 'Audit logs', 'Priority support'],
  },
]

export const faqCategories = ['All', 'How it works', 'AI', 'Security', 'Integrations', 'Pricing', 'Teams']

export const faqs = [
  { category: 'How it works', q: 'How does CloudFlow work?', a: 'You connect your cloud accounts and CloudFlow reads metrics, logs and deploy events. It puts them on one dashboard, spots unusual behavior and groups related problems into a single incident.' },
  { category: 'How it works', q: 'How long does setup take?', a: 'A typical setup takes about 10 minutes. You add a read-only connection, pick the services to watch and your first dashboard is ready.' },
  { category: 'AI', q: 'How do the AI recommendations work?', a: 'The Advisor looks at your metrics, recent deploys and past incidents together. It then explains what changed and suggests a next step, with the data it used shown beside each answer.' },
  { category: 'AI', q: 'Can the Advisor change my infrastructure?', a: 'No. The Advisor only reads data and makes suggestions. Every change stays in your hands.' },
  { category: 'Security', q: 'Is my data safe?', a: 'Connections are read-only, data is encrypted in transit and at rest, and you choose which accounts and services CloudFlow can see.' },
  { category: 'Integrations', q: 'Which tools does CloudFlow connect to?', a: 'AWS, Google Cloud and Azure, plus Slack, GitHub, PagerDuty and email for alerts and deploy tracking.' },
  { category: 'Pricing', q: 'Is there a free plan?', a: 'Yes. Starter is free forever for up to 5 services. You can upgrade whenever your team grows.' },
  { category: 'Pricing', q: 'Can I switch plans or cancel?', a: 'You can change plans or cancel at any time. Yearly plans save about 20% compared with monthly billing.' },
  { category: 'Teams', q: 'Can my whole team use CloudFlow?', a: 'Yes. Invite teammates, assign incidents, leave notes on charts and share live dashboards with a link.' },
  { category: 'Teams', q: 'Can I control who sees what?', a: 'Pro and Scale include roles, so you can decide who can view, edit or manage each project.' },
]

export const principles = [
  { icon: 'Eye', title: 'Clarity over volume', body: 'Showing less, but showing the right thing, helps teams act faster than another chart ever will.' },
  { icon: 'MessageSquareText', title: 'Explain, do not just alert', body: 'Every alert should answer "what happened" and "what should I do next" in plain words.' },
  { icon: 'HandHelping', title: 'Humans stay in charge', body: 'CloudFlow suggests. People decide. We never change your infrastructure for you.' },
]

export const team = [
  { name: 'Priya Raman', role: 'Co-founder and CEO' },
  { name: 'Jonas Weber', role: 'Co-founder and CTO' },
  { name: 'Amara Nwosu', role: 'Head of Design' },
  { name: 'Leo Martins', role: 'Staff Engineer, AI' },
  { name: 'Sofia Lindqvist', role: 'Head of Product' },
  { name: 'Kenji Sato', role: 'Developer Advocate' },
]

export const companyStats = [
  { value: '2021', label: 'Founded' },
  { value: '38', label: 'Team members' },
  { value: '4,200', label: 'Teams on CloudFlow' },
  { value: '9', label: 'Countries' },
]

export const resourcesMenu = [
  { to: '/advisor', label: 'AI Cloud Advisor', hint: 'Try the chat demo' },
  { to: '/faq', label: 'FAQ', hint: 'Common questions' },
  { to: '/contact', label: 'Contact', hint: 'Get in touch' },
]
