// One drawn arrow for every link; dir: ne (external), s (download), n (to top)
const PATHS = {
  ne: 'M2.5 9.5L9.5 2.5M4 2.5h5.5V8',
  s: 'M6 1.5v9M2.5 7L6 10.5 9.5 7',
  n: 'M6 10.5v-9M2.5 5L6 1.5 9.5 5',
}

export default function Arrow({ dir = 'ne', size = 11 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d={PATHS[dir]} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
