import { useEffect, useState } from 'react'
import './Bridge.css'
import useInView from '../../useInView.js'
import { validators, notes } from './bridge.data.js'

const labels = { chainA: 'Chain A', chainB: 'Chain B', bridge: 'Bridge', validators: 'Validators', monitor: 'Monitor' }

export default function Bridge({ compact = false }) {
  const [ref, inView] = useInView()
  const [tick, setTick] = useState(0)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setTick((n) => n + 1), 900)
    return () => clearInterval(t)
  }, [inView])

  const reporting = tick % validators.length // validator currently reporting to the monitor
  const lagging = Math.floor(tick / 7) % validators.length // simulated degraded node
  const focus = hover ?? 'validators'
  const bind = (id) => ({
    tabIndex: compact ? -1 : 0,
    onMouseEnter: () => setHover(id), onMouseLeave: () => setHover(null),
    onFocus: () => setHover(id), onBlur: () => setHover(null),
    className: `br-zone ${focus === id ? 'is-live' : ''}`,
  })

  return (
    <figure ref={ref} className={`br ${inView ? '' : 'is-paused'}`}>
      <svg viewBox="0 0 800 400" role="img" aria-label="Illustrative bridge topology: two chains joined by a bridge, a ring of validators, and a monitor checking health and SLAs.">
        <circle cx="400" cy="190" r="128" className="br-orbit" />
        <circle cx="400" cy="190" r="168" className="br-orbit br-orbit--outer" />

        <g {...bind('chainA')}>
          <rect x="20" y="130" width="120" height="120" rx="8" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="36" y={146 + i * 24} width="88" height="14" rx="2" className="br-block" />)}
          <text x="20" y="276" className="br-label">{labels.chainA}</text>
        </g>
        <g {...bind('chainB')}>
          <rect x="660" y="130" width="120" height="120" rx="8" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="676" y={146 + i * 24} width="88" height="14" rx="2" className="br-block" />)}
          <text x="660" y="276" className="br-label">{labels.chainB}</text>
        </g>

        <path id="br-span" d="M140 190 C 260 190, 300 150, 400 150 S 540 190, 660 190" className="br-span" />
        <g {...bind('bridge')}>
          <rect x="360" y="168" width="80" height="44" rx="6" />
          <text x="400" y="195" textAnchor="middle" className="br-label">{labels.bridge}</text>
        </g>

        <g {...bind('validators')}>
          {validators.map((v, i) => (
            <g key={v.id}>
              {i === reporting && <path d={`M${v.x} ${v.y} L400 362`} className="br-report" />}
              <circle cx={v.x} cy={v.y} r="11" className={`br-node ${i === lagging ? 'is-lag' : ''} ${i === reporting ? 'is-reporting' : ''}`} />
              <text x={v.x} y={v.y + 3.5} textAnchor="middle" className="br-node-id">{i + 1}</text>
            </g>
          ))}
        </g>

        <g {...bind('monitor')}>
          <rect x="300" y="348" width="200" height="40" rx="6" />
          <text x="316" y="373" className="br-label">{labels.monitor}</text>
          {['hb', 'sla', 'alert'].map((k, i) => (
            <rect key={k} x={430 + i * 18} y="362" width="12" height="12" rx="2" className={`br-check ${tick % 3 === i ? 'is-on' : ''}`} />
          ))}
        </g>

        {[0, 1, 2].map((i) => (
          <circle key={i} r="4" className="br-packet" style={{ offsetPath: "path('M140 190 C 260 190, 300 150, 400 150 S 540 190, 660 190')", animationDelay: `${i * 1.1}s` }} />
        ))}
      </svg>
      {!compact && (
        <figcaption className="pl-caption mono" aria-live="polite">
          <span className="pl-caption-key caps">{labels[focus]}</span>
          <span>{notes[focus]} <em className="br-disclaim">Illustrative, simulated states. No live data.</em></span>
        </figcaption>
      )}
    </figure>
  )
}
