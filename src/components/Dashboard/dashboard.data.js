// SYNTHETIC. Illustrative numbers for a faithful recreation of the dashboard's layout, not real Nexus data.
export const nav = ['Overview', 'CI runs', 'Tests', 'Coverage', 'Metrics']
export const filters = ['Repo · all', 'Branch · main', 'Last 30 runs']

export const passRate = [96, 97, 95, 98, 97, 93, 96, 98, 99, 97, 94, 89, 92, 96, 97, 98, 97, 99, 98, 96, 97, 98, 95, 97, 99, 98, 98, 97, 99, 99]

export const durations = [
  { name: 'build', min: 4.2 },
  { name: 'unit', min: 6.8 },
  { name: 'integration', min: 11.4 },
  { name: 'e2e', min: 17.9 },
  { name: 'deploy', min: 3.1 },
]

export const coverage = [
  { service: 'ingest-api', pct: 84, delta: '+1.2' },
  { service: 'auth', pct: 91, delta: '+0.4' },
  { service: 'metrics-worker', pct: 77, delta: '−0.8' },
  { service: 'dashboards', pct: 69, delta: '+2.1' },
]
