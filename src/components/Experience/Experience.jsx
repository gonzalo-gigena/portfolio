import './Experience.css'
import { jobs } from './experience.data.js'
import Deco from '../Deco/Deco.jsx'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <Deco set="experience" />
      <h2 className="section-title reveal"><span>where i've worked</span></h2>
      <div className="exp-list">
        {jobs.map((j) => (
          <article key={j.company} className="card exp-card reveal">
            <header className="exp-head" style={{ background: j.color }}>
              <div>
                <h3>{j.role}</h3>
                <p>{j.company} · {j.place}</p>
              </div>
              <span className="tag">{j.dates}</span>
            </header>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
