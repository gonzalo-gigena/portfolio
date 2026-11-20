import { Fragment } from 'react'
import './Pipeline.css'
import useInView from '../../useInView.js'
import { stages } from './pipeline.data.js'

// CI PIPELINES → INGESTION → RUST → LAKEHOUSE → DASHBOARDS. `active` lights stages in order;
// packets only travel edges whose target stage is live. The last stage carries data-zoom for the camera push.
export default function Pipeline({ active = stages.length, compact = false }) {
  const [ref, inView] = useInView('0px')
  return (
    <ol ref={ref} className={`pipe ${compact ? 'pipe--compact' : ''} ${inView ? '' : 'is-paused'}`} aria-label="Telemetry pipeline, five stages">
      {stages.map((s, i) => (
        <Fragment key={s.id}>
          {i > 0 && (
            <li className={`pipe-edge ${i < active ? 'is-on' : ''}`} aria-hidden="true">
              <span className="pipe-track"><i /></span>
              <span className="pipe-track" style={{ animationDelay: '-0.9s' }}><i /></span>
            </li>
          )}
          <li className={`pipe-stage ${i < active ? 'is-on' : ''}`} data-zoom={i === stages.length - 1 ? '' : undefined}>
            <span className="pipe-top mono">
              <span>S{i + 1}</span>
              <span className="pipe-dot" aria-hidden="true" />
            </span>
            <span className="pipe-name">{compact ? s.short : s.name}</span>
            {!compact && <span className="pipe-sub mono">{s.sub}</span>}
            {!compact && s.extra && <span className="pipe-extra mono">{s.extra}</span>}
            <span className="sr-only">{i < active ? ', live' : ', idle'}</span>
          </li>
        </Fragment>
      ))}
    </ol>
  )
}
