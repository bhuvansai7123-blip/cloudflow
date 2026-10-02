const colors = { ok: 'bg-ok', warn: 'bg-warn', bad: 'bg-bad', flow: 'bg-flow' }

export default function StatusDot({ tone = 'ok', pulse = false }) {
  return (
    <span className="relative inline-flex h-2 w-2" aria-hidden="true">
      {pulse && <span className={`absolute inline-flex h-full w-full animate-ping2 rounded-full ${colors[tone]}`} />}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[tone]}`} />
    </span>
  )
}
