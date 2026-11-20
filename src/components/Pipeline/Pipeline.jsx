import { useEffect, useState } from 'react'
import './Pipeline.css'
import useInView from '../../useInView.js'
import { sources, stages, notes } from './pipeline.data.js'

const MID = 200
const srcPath = (y) => `M170 ${y + 23} C 215 ${y + 23}, 205 ${MID}, 250 ${MID}`

// Telemetry lakehouse as a living diagram. `compact` drops the caption (deck card face).
export default function Pipeline({ compact = false }) {
  const [ref, inView] = useInView()
  const [cycle, setCycle] = useState(0)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    if (!inView || hover) return
    const t = setInterval(() => setCycle((c) => (c + 1) % sources.length), 2400)
    return () => clearInterval(t)
  }, [inView, hover])

  const liveSrc = hover && sources.some((s) => s.id === hover) ? hover : sources[cycle].id
  const focus = hover ?? liveSrc
  const bind = (id) => ({
    tabIndex: compact ? -1 : 0,
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    className: `pl-node ${focus === id ? 'is-live' : ''}`,
  })

  return (
    <figure ref={ref} className={`pl ${inView ? '' : 'is-paused'} ${compact ? 'pl--compact' : ''}`}>
      <svg viewBox="0 0 800 400" role="img" aria-label="Pipeline: CI artifacts, test results, coverage and Prometheus metrics flow into ingestion, Rust processing, a PostgreSQL lakehouse, then dashboards.">
        <defs>
          <pattern id="pl-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#1e1e1e" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#pl-grid)" />

        {sources.map((s) => (
          <path key={s.id} d={srcPath(s.y)} className={`pl-wire ${liveSrc === s.id ? 'is-live' : ''}`} />
        ))}
        <path d="M360 200 H410 M520 200 H570 M670 200 H700" className="pl-wire is-live" />

        {sources.map((s) => (
          <g key={s.id} {...bind(s.id)}>
            <rect x="20" y={s.y} width="150" height="46" rx="6" />
            <text x="36" y={s.y + 28} className="pl-label">{s.label}</text>
          </g>
        ))}

        {stages.map((st) => (
          <g key={st.id} {...bind(st.id)}>
            {st.id === 'lake' ? (
              <>
                <rect x={st.x} y="130" width="100" height="40" rx="6" />
                <rect x={st.x} y="180" width="100" height="40" rx="6" />
                <rect x={st.x} y="230" width="100" height="40" rx="6" />
              </>
            ) : (
              <rect x={st.x} y="150" width={st.id === 'dash' ? 80 : 110} height="100" rx="6" />
            )}
            <text x={st.x + 12} y={st.id === 'lake' ? 118 : 176} className="pl-label">{st.label}</text>
            <text x={st.x + 12} y={st.id === 'lake' ? 296 : 238} className="pl-sub">{st.sub}</text>
            {st.id === 'dash' && [0, 1, 2, 3].map((i) => (
              <rect key={i} x={712 + i * 15} y={222 - (i % 2 ? 26 : 16) - i * 6} width="8" height={(i % 2 ? 26 : 16) + i * 6} className="pl-bar" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
            {st.id === 'rust' && <path d="M425 205 l10 -8 l10 8 l10 -8 l10 8 l10 -8 l10 8" className="pl-squiggle" />}
          </g>
        ))}

        {/* packets: CSS offset-path along the wires */}
        {sources.map((s, i) => (
          <circle key={s.id} r="3.5" className={`pl-packet ${liveSrc === s.id ? 'is-live' : ''}`} style={{ offsetPath: `path('${srcPath(s.y)}')`, animationDelay: `${i * 0.45}s` }} />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} r="3.5" className="pl-packet is-live pl-packet--main" style={{ offsetPath: "path('M250 200 H700')", animationDelay: `${i * 0.9}s` }} />
        ))}
      </svg>
      {!compact && (
        <figcaption className="pl-caption mono" aria-live="polite">
          <span className="pl-caption-key caps">{[...sources, ...stages].find((n) => n.id === focus)?.label}</span>
          <span>{notes[focus]}</span>
        </figcaption>
      )}
    </figure>
  )
}
