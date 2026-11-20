import './About.css'
import { about, aside } from './about.data.js'

// 05 — the quiet one. One paragraph and a lot of canvas.
export default function About() {
  return (
    <section id="about" className="about section" tabIndex={-1} aria-labelledby="about-title">
      <div className="grid">
        <div className="label-col">
          <h2 id="about-title"><span className="mono dim" aria-hidden="true">(05)</span>About</h2>
        </div>
        <p className="about-text">{about}</p>
        <p className="about-aside mono dim">{aside}</p>
      </div>
    </section>
  )
}
