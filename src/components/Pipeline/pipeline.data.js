export const sources = [
  { id: 'ci', label: 'CI artifacts', y: 50 },
  { id: 'tests', label: 'Test results', y: 130 },
  { id: 'cov', label: 'Coverage', y: 210 },
  { id: 'prom', label: 'Prometheus', y: 290 },
]

export const stages = [
  { id: 'ingest', label: 'Ingest', sub: 'webhooks · APIs', x: 250 },
  { id: 'rust', label: 'Rust', sub: 'processing · REST', x: 410 },
  { id: 'lake', label: 'Lakehouse', sub: 'PostgreSQL', x: 570 },
  { id: 'dash', label: 'Dashboards', sub: 'React · TS', x: 700 },
]

export const notes = {
  ci: 'Source: build artifacts pushed from CI pipelines.',
  tests: 'Source: test results from every CI run.',
  cov: 'Source: code coverage reports.',
  prom: 'Source: Prometheus metrics.',
  ingest: 'Ingestion pipelines and webhook receivers with signature verification.',
  rust: 'Rust REST APIs on PostgreSQL: authentication, access control, audit logging.',
  lake: 'PostgreSQL on Cloud SQL; services on Cloud Run, provisioned with Terraform.',
  dash: 'React + TypeScript dashboards: TanStack Query, Recharts, Radix UI.',
}
