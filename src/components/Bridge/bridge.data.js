// ILLUSTRATION. Topology and states are simulated; no metrics, no live data.
export const bridge = {
  id: 'bridge',
  title: ['Bridge', 'Monitoring'],
  line: 'Observability for blockchain bridge infrastructure: validator health, SLA monitoring and the integrations that raise the alarm.',
  meta: 'Project 02 / 08 · Nexus · Bridge infrastructure · Validator health · SLA monitoring · 2026—now',
  note: 'Illustration · simulated states · not live data',
}

// horizontal layout in a 1000 × 560 box; the phone layout transposes centres (x ↔ y)
const arc = (k) => {
  const a = ((205 + (k * 130) / 6) * Math.PI) / 180
  return [500 + 190 * Math.cos(a), 300 + 190 * Math.sin(a)]
}
export const validators = Array.from({ length: 7 }, (_, k) => ({ id: `V${k + 1}`, c: arc(k), weak: k === 2 || k === 4 }))

export const boxes = [
  { id: 'chainA', c: [100, 300], w: 150, h: 200, flow: true, label: 'Chain A', sub: 'Source' },
  { id: 'chainB', c: [900, 300], w: 150, h: 200, flow: true, label: 'Chain B', sub: 'Destination' },
  { id: 'bridgeA', c: [300, 300], w: 132, h: 62, label: 'Bridge', sub: 'Src contract' },
  { id: 'bridgeB', c: [700, 300], w: 132, h: 62, label: 'Bridge', sub: 'Dst contract' },
  { id: 'sla', c: [410, 470], w: 160, h: 62, label: 'SLA monitor', status: true },
  { id: 'alert', c: [620, 470], w: 160, h: 62, label: 'Alerting', status: true },
]

export const states = {
  healthy: { label: 'Healthy', sla: 'Within SLA', alert: 'Idle' },
  degraded: { label: 'Degraded', sla: 'At risk', alert: 'Alert sent' },
  recovered: { label: 'Recovered', sla: 'Within SLA', alert: 'Resolved' },
}
