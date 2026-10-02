import useDocumentMeta from '../hooks/useDocumentMeta'
import Button from '../components/ui/Button'

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', description: 'This page does not exist in the CloudFlow demo.', path: '/404' })
  return (
    <section className="container-x py-28 text-center">
      <h1 className="text-5xl font-semibold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">That address does not exist in this demo. Head back to the home page or open the dashboard.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button to="/">Go home</Button>
        <Button to="/product" variant="secondary">Open dashboard</Button>
      </div>
    </section>
  )
}
