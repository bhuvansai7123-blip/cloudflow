import {
  Activity, BellRing, ChartNoAxesCombined, Circle, Diamond, Eye, FileText, Gauge, HandHelping,
  HeartPulse, Hexagon, MessageSquareText, Octagon, Radar, ShieldCheck, Sparkles, Square,
  Triangle, TriangleAlert, Users,
} from 'lucide-react'

// Mock data refers to icons by name, so we map names to components here.
const ICONS = {
  Activity, BellRing, ChartNoAxesCombined, Circle, Diamond, Eye, FileText, Gauge, HandHelping,
  HeartPulse, Hexagon, MessageSquareText, Octagon, Radar, ShieldCheck, Sparkles, Square,
  Triangle, TriangleAlert, Users,
}

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] ?? Circle
  return <Component aria-hidden="true" {...props} />
}
