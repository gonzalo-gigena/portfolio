import { useEffect, useRef, useState } from 'react'
import './Experience.css'
import PixelHeading from '../PixelHeading/PixelHeading.jsx'
import Odometer from '../Odometer/Odometer.jsx'
import { jobs, record } from './experience.data.js'

function Row({ job, i }) {
  const [open, setOpen] = useState(i === 0)
  const [seen, setSeen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: '0px 0px -15% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const id = `job-${i}`
  return (
    <li ref={ref} className={`ex-row ${open ? 'is-open' : ''}`}>
      <button type="button" className="ex-head" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="ex-dates mono">
          <Odometer value={job.from} run={seen} /> — {/\d/.test(job.to) ? <Odometer value={job.to} run={seen} /> : job.to}
        </span>
        <span className="ex-role"><strong>{job.role}</strong> <span className="dim">{job.company}</span></span>
        <span className="ex-place mono dim">{job.place}</span>
        <span className="ex-toggle" aria-hidden="true" />
      </button>
      <ul id={id} className="ex-points" hidden={!open}>
        {job.points.map((pt) => <li key={pt}>{pt}</li>)}
      </ul>
    </li>
  )
}

// 04 — a hairline chronological table, scannable in five seconds; rows open to three lines each.
export default function Experience() {
  return (
    <section id="experience" className="experience section" tabIndex={-1} aria-labelledby="experience-title">
      <div className="grid">
        <PixelHeading id="experience-title" className="section-title display">Experience</PixelHeading>
        <div className="label-col">
          <p><span className="mono dim" aria-hidden="true">(04)</span>Seven years across backend, frontend and data. Open a row for what the job involved.</p>
        </div>
        <div className="content-col">
          <ol className="ex-list">
            {jobs.map((j, i) => <Row key={j.company} job={j} i={i} />)}
          </ol>
          <dl className="kv ex-record">
            {record.map((r) => (
              <div key={r.k} className="kv-row">
                <dt className="mono">{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
