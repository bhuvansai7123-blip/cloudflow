import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import ThemeSwitch from '../ui/ThemeSwitch'
import { useToast } from '../../context/ToastContext'
import { resourcesMenu } from '../../data/mock'

const links = [
  { to: '/product', label: 'Product' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'text-ink' : 'text-muted hover:text-ink'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = useRef(null)
  const toast = useToast()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setResourcesOpen(false)
      }
    }
    const onClick = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setResourcesOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  const startFree = () => {
    toast('Demo workspace opened. No sign-up needed.', 'success')
    navigate('/product')
  }
  const login = () => toast('Login is turned off. CloudFlow is a demo with no accounts.', 'info')

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled || mobileOpen ? 'border-b border-line/70 bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <div className="relative" ref={resourcesRef}>
            <button
              type="button"
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              onClick={() => setResourcesOpen((o) => !o)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-ink"
            >
              Resources
              <ChevronDown className={`h-4 w-4 transition ${resourcesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {resourcesOpen && (
              <ul className="glass absolute right-0 top-full mt-2 w-60 rounded-xl p-1.5 shadow-xl shadow-black/20">
                {resourcesMenu.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} className="block rounded-lg px-3 py-2.5 hover:bg-raised">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="block text-xs text-muted">{item.hint}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeSwitch />
          <Button variant="ghost" size="sm" onClick={login} className="hidden lg:inline-flex">
            Login
          </Button>
          <Button size="sm" onClick={startFree} className="hidden sm:inline-flex">
            Start Free
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2.5 text-muted hover:bg-raised hover:text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="container-x pb-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...links, ...resourcesMenu.map((r) => ({ to: r.to, label: r.label }))].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-raised text-ink' : 'text-muted hover:bg-raised hover:text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={login}>
              Login
            </Button>
            <Button onClick={startFree}>Start Free</Button>
          </div>
        </div>
      )}
    </header>
  )
}
