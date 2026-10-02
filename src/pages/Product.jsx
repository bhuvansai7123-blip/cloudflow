import useDocumentMeta from '../hooks/useDocumentMeta'
import Badge from '../components/ui/Badge'
import Dashboard from '../components/dashboard/Dashboard'

export default function Product() {
  useDocumentMeta({
    title: 'Product dashboard',
    description: 'Explore the CloudFlow demo dashboard with interactive charts, service health, incidents and an AI Cloud Advisor, all using mock data.',
    path: '/product',
  })
  return (
    <div className="mx-auto w-full max-w-[88rem] px-4 pb-16 pt-6 sm:px-6">
      <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <Badge tone="flow">Demo workspace</Badge>
        Every number here is mock data. Switch the time range, hover the charts and ask the Advisor a question.
      </p>
      <Dashboard />
    </div>
  )
}
