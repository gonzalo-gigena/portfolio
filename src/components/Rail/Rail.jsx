import { useState } from 'react'
import './Rail.css'
import { jobs, record } from './rail.data.js'

export default function Rail() {
  const [open, setOpen] = useState(0)

  return (
    <section id="experience" className="rail page" aria-labelledby="rail-t">
      <header className="rail-head">
        <h2 id="rail-t" className="rail-h rise">Experience</h2>
        <p className="rail-sub rise">Seven years across payments, mortgage tech, model evaluation and observability. Open a card for the detail.</p>
      </header>

      <ol className="rail-list">
        {jobs.map((j, i) => {
          const isOpen = open === i
          return (
            <li key={j.company} className="rail-stop rise">
              <span className="rail-date mono caps">{j.dates}</span>
              <span className={`rail-pin ${j.now ? 'is-now' : ''}`} aria-hidden="true" />
              <div className={`rail-card stock ${isOpen ? 'is-open' : ''} ${j.now ? 'is-now' : ''}`}>
                <button className="rail-btn" aria-expanded={isOpen} aria-controls={`job-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="rail-company">{j.company}</span>
                  <span className="rail-role">
                    {j.role}<span className="dim"> · {j.place}</span>
                    {j.now && <span className="rail-now mono caps">Now</span>}
                  </span>
                  <span className="rail-plus" aria-hidden="true" />
                </button>
                <div id={`job-${i}`} className="rail-detail" role="region" aria-label={`${j.company} details`}>
                  <ul className="rail-points">
                    {j.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}

        <li className="rail-stop rise">
          <span className="rail-date mono caps">2017 – 2024</span>
          <span className="rail-pin" aria-hidden="true" />
          <div className="rail-card rail-record stock">
            <p className="rail-company">The record</p>
            <dl className="rail-dl">
              {record.map((r) => (
                <div key={r.k}><dt className="label">{r.k}</dt><dd>{r.v}</dd></div>
              ))}
            </dl>
          </div>
        </li>
      </ol>
    </section>
  )
}
