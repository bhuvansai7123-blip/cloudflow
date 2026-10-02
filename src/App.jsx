import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Heavier pages load on demand so the first visit stays fast.
const Features = lazy(() => import('./pages/Features'))
const Product = lazy(() => import('./pages/Product'))
const Advisor = lazy(() => import('./pages/Advisor'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Faq = lazy(() => import('./pages/Faq'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return <div className="container-x py-32 text-center text-muted" role="status">Loading</div>
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="product" element={<Product />} />
          <Route path="advisor" element={<Advisor />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
