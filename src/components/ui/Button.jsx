import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  // Brushed steel: silver on dark, gunmetal on light.
  primary: 'btn-metal',
  secondary: 'border border-line bg-transparent text-ink hover:border-faint hover:bg-raised',
  ghost: 'text-muted hover:bg-raised hover:text-ink',
}

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
}

export default function Button({ to, href, variant = 'primary', size = 'md', loading = false, className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} disabled={loading || rest.disabled} aria-busy={loading} {...rest}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}
