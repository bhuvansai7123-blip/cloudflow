import { useTheme } from '../context/ThemeContext'

const PALETTES = {
  dark: { grid: '#2c3036', text: '#8b939e', flow: '#cfd5de', aurora: '#8a96a8', ok: '#2dd4bf', warn: '#f5b84b', bad: '#ff5a4d', panel: '#14161a' },
  light: { grid: '#dde1e8', text: '#5b6472', flow: '#1f252d', aurora: '#6b7686', ok: '#0b8076', warn: '#a86c04', bad: '#be1e1e', panel: '#ffffff' },
}

/** Recharts needs real colour values, so we pick them from the active theme. */
export default function useChartColors() {
  const { theme } = useTheme()
  return PALETTES[theme]
}
