// One drawn arrow for every link; dir: ne (external), s (down), e (next), flip (turn over)
const PATHS = {
  ne: 'M2.5 9.5L9.5 2.5M4 2.5h5.5V8',
  s: 'M6 1.5v9M2.5 7L6 10.5 9.5 7',
  e: 'M1.5 6h9M7 2.5L10.5 6 7 9.5',
  flip: 'M10.2 6.6A4.3 4.3 0 1 1 8.9 2.9M9.6 0.9v2.5H7.1',
}

export default function Arrow({ dir = 'ne', size = 11 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d={PATHS[dir]} fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
