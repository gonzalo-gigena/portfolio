import './Experience.css'
import { EXPERIENCE_ENTRIES } from './experience.data.js'
import { Reveal } from '../Reveal/Reveal.jsx'

export function Experience() {
  return (
    <section className="section exp" id="experience">
      <div className="parallax-char" style={{ top: 200, left: -80 }}>?</div>
      <Reveal className="section-head">
        <span className="lbl">/ section c · careers desk</span>
        <h2>
          <span style={{ fontFamily: "DM Serif Display, serif" }}>The </span>
          <span style={{ fontFamily: "Archivo Black, sans-serif" }}>job</span>
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "var(--brick)" }}> history </span>
          <span style={{ fontFamily: "VT323, monospace", color: "var(--teal)" }}>column.</span>
        </h2>
        <div className="right">est. 2017<br />(of any consequence)</div>
      </Reveal>
      <div className="articles">
        {EXPERIENCE_ENTRIES.map((e, i) => (
          <Reveal as="article" className="entry" key={i} tilt>
            <div className="meta-col">
              <span className="dateline">{e.dateline}</span>
              <span className="when">{e.when}</span>
              <span className="where">{e.where}</span>
              <span className={`stamp ${e.stamp === "void" ? "ink" : e.stamp === "approved" ? "teal" : ""}`}>{e.stamp}</span>
            </div>
            <div className="body">
              <h3>
                <span className="alt-a">{e.role_a}</span>
                <span className="alt-s">{e.role_b}</span>{" "}
                <span className="at">@ {e.at}</span>
              </h3>
              <div className="lead">{e.lead}</div>
              <div className="cols">
                {e.cols.map((p, j) => <p key={j}>{p}</p>)}
              </div>
              <div className="stack">
                {e.stack.map((s, j) => (
                  <span className={`chip ${j === 0 ? "hl" : ""}`} key={j}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
