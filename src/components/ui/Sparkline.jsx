/** A tiny line with no axes, for showing the shape of a metric inside a number card. */
export default function Sparkline({ values, className = 'stroke-muted', height = 28 }) {
  const W = 100
  const min = Math.min(...values)
  const span = Math.max(...values) - min || 1
  const step = W / (values.length - 1)
  const d = values
    .map((v, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)} ${(height - 2 - ((v - min) / span) * (height - 4)).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} aria-hidden="true">
      <path d={d} fill="none" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" className={className} />
    </svg>
  )
}
