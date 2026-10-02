import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const MODES = [
  { id: 'dark', label: 'Dark Ultron mode', icon: Moon },
  { id: 'light', label: 'Light Ultron mode', icon: Sun },
]

/** Shows both modes side by side so people can see there are two, and pick one directly. */
export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <div role="group" aria-label="Color mode" className="flex rounded-lg border border-line p-0.5">
      {MODES.map(({ id, label, icon: ModeIcon }) => {
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
            className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${
              active ? 'bg-raised text-ember' : 'text-muted hover:text-ink'
            }`}
          >
            <ModeIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
