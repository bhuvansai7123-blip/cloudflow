import Icon from '../ui/Icon'
import FeatureVisual from './FeatureVisual'
import { features } from '../../data/mock'

/** Used on the Features page: two wide cards per row, text on the left, small demo on the right. */
export default function FeatureGrid() {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {features.map((f) => (
        <li key={f.id} className="metal metal flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex-1">
            <Icon name={f.icon} className="h-5 w-5 text-flow" />
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.description}</p>
          </div>
          <div className="rounded-lg border border-line bg-bg/60 p-3.5 sm:w-44 sm:shrink-0">
            <FeatureVisual id={f.id} />
          </div>
        </li>
      ))}
    </ul>
  )
}
