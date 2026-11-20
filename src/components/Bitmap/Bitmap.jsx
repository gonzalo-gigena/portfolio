import { pathOf, rowsOf, MONOGRAM } from '../../pixel.js'

// Static bitmap lettering (name, monogram) as one crisp SVG path in currentColor.
export default function Bitmap({ lines, rows = rowsOf(lines), label, className = '' }) {
  return (
    <svg
      className={`bitmap ${className}`}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={pathOf(rows)} fill="currentColor" />
    </svg>
  )
}

export const Monogram = (props) => <Bitmap rows={MONOGRAM} {...props} />
