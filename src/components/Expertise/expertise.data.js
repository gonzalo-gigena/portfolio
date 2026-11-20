export const intro = 'Four disciplines. Hover a tag to see where it was used.'

export const blocks = [
  { key: 'A', name: 'Backend', line: 'Services that stay correct under load and leave a record of what they did.', tags: ['Rust', 'Go', 'Python', 'Node.js', 'REST APIs', 'Distributed systems'] },
  { key: 'B', name: 'Frontend', line: 'Interfaces for dense operational data that people actually read.', tags: ['JavaScript', 'TypeScript', 'React'] },
  { key: 'C', name: 'Infrastructure & Data', line: 'Pipelines that ingest, store and serve telemetry, observed end to end.', tags: ['PostgreSQL', 'Telemetry', 'Data pipelines', 'Prometheus', 'Docker', 'CI/CD'] },
  { key: 'D', name: 'Integration', line: 'The seams between systems: webhooks, third-party APIs and the monitoring that watches them.', tags: ['API integration', 'Webhooks', 'Observability', 'Monitoring'] },
]

// Where each tag was used beyond the public index (CV-true). Projects come from their own `tags`.
export const usedIn = {
  Rust: ['01 Telemetry Lakehouse'],
  Go: [],
  'Node.js': ['Zenrise · secure APIs'],
  'REST APIs': ['01 Telemetry Lakehouse', 'Zenrise · Spring Boot'],
  'Distributed systems': ['02 Bridge Monitoring'],
  JavaScript: ['Zenrise · Leniolabs'],
  TypeScript: ['01 Telemetry Lakehouse'],
  React: ['01 Telemetry Lakehouse', 'Leniolabs · EPPS', 'Zenrise'],
  PostgreSQL: ['01 Telemetry Lakehouse'],
  Telemetry: ['01 Telemetry Lakehouse'],
  'Data pipelines': ['01 Telemetry Lakehouse', 'Zenrise · payments'],
  Prometheus: ['01 Telemetry Lakehouse'],
  Docker: ['01 Telemetry Lakehouse'],
  'CI/CD': ['01 Telemetry Lakehouse', 'Leniolabs'],
  'API integration': ['01 Telemetry Lakehouse', '02 Bridge Monitoring', 'Zenrise · banking'],
  Webhooks: ['01 Telemetry Lakehouse'],
  Observability: ['01 Telemetry Lakehouse', '02 Bridge Monitoring'],
  Monitoring: ['02 Bridge Monitoring'],
  Python: ['Outlier · LLM code review'],
}
