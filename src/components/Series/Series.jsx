import { useEffect, useState } from 'react'
import './Series.css'
import { projects } from './series.data.js'
import Pipeline from '../Pipeline/Pipeline.jsx'
import Bridge from '../Bridge/Bridge.jsx'
import Satellite from '../Satellite/Satellite.jsx'
import Arrow from '../Arrow/Arrow.jsx'

const VIZ = { pipeline: Pipeline, bridge: Bridge, satellite: Satellite }
const RUN = [...projects.map((p) => ({ no: p.no, id: p.id })), { no: '04', id: 'contact' }]

function FlipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2 5a5 5 0 0 1 9-1.5M12 9a5 5 0 0 1-9 1.5M11 1v3H8M3 13v-3h3" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function Card({ p, live }) {
  const [flipped, setFlipped] = useState(false)
  const Viz = VIZ[p.viz]
  const head = (side) => (
    <div className="sr-head mono caps">
      <span className={live ? 'sr-code is-live' : 'sr-code'}>No.{p.no}<span className="dim"> / 04{side}</span></span>
      <span className="dim">{p.where}</span>
    </div>
  )

  return (
    <article id={p.id} className="sr" aria-labelledby={`${p.id}-t`}>
      <div className={`sr-card ${flipped ? 'is-flipped' : ''}`}>
        <div className="sr-face stock">
          {head('')}
          <div className="sr-face-body">
            <div className="sr-text">
              <span className="sr-no numeral" aria-hidden="true">{p.no}</span>
              <h3 id={`${p.id}-t`} className="sr-title">{p.title}</h3>
              <p className="sr-short">{p.short}</p>
            </div>
            <div className="sr-viz"><Viz /></div>
          </div>
        </div>

        <div className="sr-back stock">
          {head(' · reverse')}
          <div className="sr-back-intro">
            <p className="sr-line">{p.line}</p>
            <ul className="sr-stack mono" aria-label="Stack">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            {p.repos && (
              <ul className="sr-repos">
                {p.repos.map(([name, url]) => (
                  <li key={name}><a className="link-u" href={url} target="_blank" rel="noreferrer">{name}<Arrow /></a></li>
                ))}
              </ul>
            )}
          </div>
          <dl className="sr-dl">
            {p.reverse.map(([k, v]) => (
              <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <span className="sr-back-no numeral" aria-hidden="true">{p.no}</span>
        </div>

        <button className="sr-flip" onClick={() => setFlipped(!flipped)} aria-pressed={flipped}>
          <FlipIcon />
          <span>{flipped ? 'Turn back to the face' : 'Turn the card over for the details'}</span>
        </button>
      </div>
    </article>
  )
}

export default function Series() {
  const [seen, setSeen] = useState({})
  const [current, setCurrent] = useState(null)
  const [show, setShow] = useState(false)

  // the set checklist: a card counts as collected once it has been in view
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        setSeen((s) => ({ ...s, [e.target.id]: true }))
        setCurrent(e.target.id)
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    RUN.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const work = new IntersectionObserver(([e]) => setShow(e.isIntersecting), { rootMargin: '0px 0px -40% 0px' })
    work.observe(document.getElementById('work'))
    return () => { io.disconnect(); work.disconnect() }
  }, [])

  return (
    <section id="work" className="series page" aria-labelledby="work-t">
      <header className="series-head">
        <h2 id="work-t" className="series-h rise">Selected work</h2>
        <p className="series-sub rise">Three cards from a run of four. The face shows the system moving; turn it over for the dense reverse. The fourth slot is still empty.</p>
      </header>

      <div className="series-stack">
        {projects.map((p) => <Card key={p.id} p={p} live={current === p.id} />)}
      </div>

      <nav className={`checklist mono ${show ? 'is-shown' : ''}`} aria-label="Card checklist">
        {RUN.map(({ no, id }) => (
          <a key={id} href={`#${id}`} className={`check ${seen[id] ? 'is-seen' : ''} ${current === id ? 'is-current' : ''}`} aria-label={`Card ${no}`}>
            {no}
          </a>
        ))}
      </nav>
    </section>
  )
}
