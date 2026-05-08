import './PressClippings.css'
import { PRESS_CLIPS } from './pressClippings.data.js'
import { Reveal } from '../Reveal/Reveal.jsx'

export function PressClippings() {
  return (
    <section className="section press" id="press">
      <Reveal className="section-head">
        <span className="lbl">/ section e · archives</span>
        <h2>
          <span style={{ fontFamily: "DM Serif Display, serif" }}>From the </span>
          <span style={{ fontFamily: "Archivo Black, sans-serif" }}>photo </span>
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "var(--punk)" }}>morgue.</span>
        </h2>
        <div className="right">→ scroll to browse<br />· not real</div>
      </Reveal>
      <Reveal className="press-strip">
        {PRESS_CLIPS.map((c, i) => (
          <div className="clip" key={i}>
            <div className={`clip-img ${c.img}`} />
            <h4>
              <span className="a">{c.title_a}</span>
              <span className="s">{c.title_s}</span>
              <span className="p">{c.title_p}</span>
            </h4>
            <p className="cap">{c.cap}</p>
            <span className="src">— {c.src}</span>
          </div>
        ))}
      </Reveal>
      <div className="press-foot">↪ horizontal scroll · or arrow keys, if you&apos;re brave</div>
    </section>
  )
}
