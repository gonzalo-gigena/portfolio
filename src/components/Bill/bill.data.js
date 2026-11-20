// tier 1 = what he reaches for first; tier 3 = also in the toolbox. `where` must stay CV-true.
export const bill = [
  {
    group: 'Backend & data',
    items: [
      { name: 'Rust', tier: 1, where: 'Nexus: REST APIs on PostgreSQL for the telemetry platform.' },
      { name: 'PostgreSQL', tier: 1, where: 'Nexus: the store behind the telemetry lakehouse, on Cloud SQL.' },
      { name: 'Go', tier: 2, where: 'Part of the backend toolbox.' },
      { name: 'Python', tier: 2, where: 'Thesis CNNs and pipelines; LLM code review and data analysis at Outlier.' },
      { name: 'Node.js', tier: 2, where: 'Zenrise: secure APIs with Express and MongoDB.' },
      { name: 'REST APIs', tier: 3, where: 'Nexus (Rust) and Zenrise (Spring Boot, Express).' },
      { name: 'Spring Boot', tier: 3, where: 'Zenrise: RESTful services for payment workflows.' },
      { name: 'MongoDB', tier: 3, where: 'Zenrise: schemas and query optimization.' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', tier: 1, where: 'Every role: Nexus dashboards, EPPS at Leniolabs, Zenrise dashboards.' },
      { name: 'TypeScript', tier: 1, where: 'Nexus: dashboards with TanStack Query, Recharts and Radix UI.' },
      { name: 'JavaScript', tier: 2, where: 'Across the stack since 2019.' },
      { name: 'TanStack Query', tier: 3, where: 'Nexus dashboards.' },
      { name: 'Tailwind', tier: 3, where: 'Nexus dashboards.' },
      { name: 'Material UI', tier: 3, where: 'Leniolabs: reusable components on a shared design system.' },
      { name: 'WCAG', tier: 3, where: 'Leniolabs: accessibility compliance on EPPS.' },
    ],
  },
  {
    group: 'Infrastructure & observability',
    items: [
      { name: 'Telemetry', tier: 1, where: 'Nexus: CI artifacts, tests, coverage and metrics in one platform.' },
      { name: 'Prometheus', tier: 2, where: 'Nexus: Prometheus metrics ingested into the telemetry lakehouse.' },
      { name: 'GCP', tier: 2, where: 'Nexus: Cloud Run and Cloud SQL.' },
      { name: 'Docker', tier: 2, where: 'Nexus: containerized services.' },
      { name: 'Terraform', tier: 3, where: 'Nexus: infrastructure as code.' },
      { name: 'GitHub Actions', tier: 3, where: 'CI/CD, tests, security checks and monitoring.' },
      { name: 'Data pipelines', tier: 3, where: 'Ingestion at Nexus; async payment pipelines at Zenrise.' },
    ],
  },
  {
    group: 'Quality, AI & security',
    items: [
      { name: 'Testing', tier: 2, where: 'Vitest and Testing Library at Nexus.' },
      { name: 'LLM evaluation', tier: 2, where: 'Outlier: evaluation prompts and training data for code models.' },
      { name: 'MCP', tier: 3, where: 'Nexus: MCP access to telemetry services.' },
      { name: 'Claude Code', tier: 3, where: 'Nexus: AI-assisted development with automated verification.' },
      { name: 'OIDC / JWT', tier: 3, where: 'Authentication for backend services.' },
    ],
  },
]
