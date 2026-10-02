import { useId } from 'react'
import { Area, CartesianGrid, ComposedChart, Line, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useChartColors from '../../hooks/useChartColors'
import { DEPLOYS, INCIDENT_WINDOW } from '../../data/mock'

function ChartTooltip({ active, payload, label, unit, names }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-line bg-raised px-3 py-2 text-xs shadow-lg">
      <p className="text-muted">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 text-sm font-semibold tabular-nums">
          {names[p.dataKey]}: {p.value.toLocaleString('en-US')}
          {unit}
        </p>
      ))}
    </div>
  )
}

export default function MetricChart({ data, dataKey, name, unit = '', color = 'flow', height = 220, showIncident = false, showDeploys = false, secondary }) {
  const colors = useChartColors()
  const stroke = colors[color]
  const gradientId = `grad-${useId().replace(/:/g, '')}`
  const has = (t) => data.some((d) => d.time === t)
  const hasWindow = showIncident && has(INCIDENT_WINDOW.from) && has(INCIDENT_WINDOW.to)
  const deploys = showDeploys ? DEPLOYS.filter((d) => has(d.time)) : []
  const last = data[data.length - 1]
  const names = { [dataKey]: name, ...(secondary ? { [secondary.key]: secondary.name } : {}) }

  return (
    <div role="img" aria-label={`${name} chart. Latest value ${last[dataKey]}${unit}.`} style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 14, right: 8, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.25} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.grid} strokeDasharray="2 5" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: colors.text, fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={40} />
          <YAxis tick={{ fill: colors.text, fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
          <Tooltip content={<ChartTooltip unit={unit} names={names} />} cursor={{ stroke: colors.text, strokeDasharray: '3 3' }} />
          {hasWindow && <ReferenceArea x1={INCIDENT_WINDOW.from} x2={INCIDENT_WINDOW.to} fill={colors.bad} fillOpacity={0.08} />}
          {deploys.map((d) => (
            <ReferenceLine key={d.time} x={d.time} stroke={colors.text} strokeDasharray="2 4" label={{ value: d.label, position: 'insideTopLeft', fill: colors.text, fontSize: 10 }} />
          ))}
          <Area type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} fill={`url(#${gradientId})`} activeDot={{ r: 4 }} isAnimationActive={false} />
          {secondary && <Line type="monotone" dataKey={secondary.key} stroke={colors.text} strokeWidth={1.5} strokeDasharray="4 3" dot={false} isAnimationActive={false} />}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
