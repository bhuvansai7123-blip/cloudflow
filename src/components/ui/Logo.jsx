import { Link } from 'react-router-dom'

export function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-ink" />
      <path d="M14 26c8-9 14 9 22 0s10 4 14-2" fill="none" className="stroke-bg" strokeWidth="5" strokeLinecap="round" />
      <path d="M14 40c8-9 14 9 22 0s10 4 14-2" fill="none" className="stroke-ember" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5 rounded-lg" aria-label="CloudFlow home">
      <LogoMark />
      <span className="metal-text font-display text-[1.2rem] font-semibold tracking-tight">CloudFlow</span>
    </Link>
  )
}
