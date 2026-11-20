import './Skills.css'
import { skills } from './skills.data.js'
import Deco from '../Deco/Deco.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Deco set="skills" />
      <h2 className="section-title reveal"><span>what i work with</span></h2>
      <div className="skills-grid stagger">
        {skills.map((s) => (
          <article key={s.group} className="card card-flat skill-card reveal">
            <h3><i className="skill-dot" style={{ background: s.color }} aria-hidden="true" />{s.group}</h3>
            <ul>{s.items.map((i) => <li key={i} className="tag">{i}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
