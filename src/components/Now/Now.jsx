import './Now.css'
import { NOW_CARDS } from './now.data.js'
import { Reveal } from '../Reveal/Reveal.jsx'
import { AnimPixelIcon } from '../PixelIcon/PixelIcon.jsx'

export function Now() {
  return (
    <section className="section now" id="now">
      <Reveal className="section-head">
        <span className="lbl">/ section b · bulletin</span>
        <h2>
          <span style={{ fontFamily: "Archivo Black, sans-serif" }}>currently</span>{" "}
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "var(--brick)" }}>doing</span>{" "}
          <span style={{ fontFamily: "VT323, monospace", color: "var(--teal)" }}>stuff.</span>
        </h2>
        <div className="right">pinned to the<br />fridge · 6 items</div>
      </Reveal>
      <Reveal className="bulletin-grid stagger">
        {NOW_CARDS.map((c, i) => (
          <div className="now-card" key={i}>
            <div className={`tape ${c.tape}`} />
            <div className="tag">{c.tag}</div>
            <h4>{c.title_a}<span className="alt">{c.title_b}</span></h4>
            <p>{c.body}</p>
            <AnimPixelIcon kind={c.icon} color={c.color} />
          </div>
        ))}
      </Reveal>
    </section>
  )
}
