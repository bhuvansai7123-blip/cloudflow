import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FaqList({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  const base = useId()

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/70">
      {items.map((item, i) => {
        const open = openIndex === i
        const panelId = `${base}-panel-${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium transition hover:bg-raised/60 sm:px-6"
              >
                {item.q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" hidden={!open} className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
