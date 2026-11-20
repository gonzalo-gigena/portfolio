import './Extras.css'
import { extras } from './extras.data.js'
import Deco from '../Deco/Deco.jsx'

export default function Extras() {
  return (
    <section id="more" className="section">
      <Deco set="more" />
      <h2 className="section-title reveal"><span>beyond work</span></h2>
      <div className="extras-grid stagger">
        {extras.map((e) => (
          <article key={e.title} className="card card-flat extra-card reveal">
            <h3><i className="extra-dot" style={{ background: e.color }} aria-hidden="true" />{e.title}</h3>
            {e.lines.map((l, i) => <p key={l} className={i === 0 ? 'lead' : ''}>{l}</p>)}
          </article>
        ))}
      </div>
    </section>
  )
}
