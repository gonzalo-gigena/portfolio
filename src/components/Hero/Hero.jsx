import './Hero.css'
import Deco from '../Deco/Deco.jsx'

export default function Hero() {
  return (
    <section id="top" className="section hero">
      <Deco set="hero" />
      <div className="hero-text reveal">
        <span className="tag tag-filled">📍 córdoba, argentina</span>
        <h1>hi, i'm <mark>gonzalo</mark>. i build software that ships.</h1>
        <p>
          Software engineer building React interfaces, backend APIs and cloud-hosted data
          platforms. Lately: TypeScript dashboards, secure Rust services, PostgreSQL and GCP —
          plus hands-on LLM evaluation and AI-assisted development.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-pill" href="#contact">get in touch</a>
          <a className="btn btn-ghost" href="#experience">see my work</a>
        </div>
      </div>
      <div className="hero-card card reveal">
        <div className="hero-stat"><b>6+</b><span>years shipping</span></div>
        <div className="hero-stat"><b>Rust</b><span>+ React + GCP</span></div>
        <div className="hero-stat"><b>ICPC</b><span>south america regional</span></div>
      </div>
    </section>
  )
}
