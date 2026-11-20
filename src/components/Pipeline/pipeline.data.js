// The telemetry lakehouse, stage by stage. Data types are the ones the platform ingests (CV).
export const stages = [
  { id: 'ci', short: 'CI', name: 'CI pipelines', sub: 'Artifacts · tests · coverage', extra: '+ Prometheus metrics' },
  { id: 'ingest', short: 'Ingest', name: 'Ingestion layer', sub: 'Webhooks · signature checks' },
  { id: 'rust', short: 'Rust', name: 'Rust processing', sub: 'REST APIs · authz · audit log' },
  { id: 'lake', short: 'Lake', name: 'Telemetry lakehouse', sub: 'PostgreSQL · Cloud SQL' },
  { id: 'dash', short: 'Dash', name: 'Observability dashboards', sub: 'React · TypeScript' },
]
