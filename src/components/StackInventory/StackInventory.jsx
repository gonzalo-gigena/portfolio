import './StackInventory.css'
import { STACK_ITEMS } from './stackInventory.data.js'
import { Reveal } from '../Reveal/Reveal.jsx'

export function StackInventory() {
  return (
    <section className="section stack-inventory" id="stack">
      <Reveal className="section-head">
        <span className="lbl">/ section a-2 · inventory</span>
        <h2>
          <span style={{ fontFamily: "DM Serif Display, serif" }}>The </span>
          <span style={{ fontFamily: "Archivo Black, sans-serif" }}>tools</span>{" "}
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "var(--brick)" }}>of the </span>
          <span style={{ fontFamily: "VT323, monospace", color: "var(--teal)" }}>trade.</span>
        </h2>
        <div className="right">classified ads<br />· lightly used</div>
      </Reveal>
      <Reveal className="inv-grid stagger">
        {STACK_ITEMS.map((it, i) => (
          <div className="inv-cell" key={i}>
            <span className="num">{it.num}</span>
            <h5><span className="alt2">{it.title_a}</span><span className="alt">{it.title_b}</span></h5>
            <span className="price">{it.price}</span>
            <div className="desc">{it.desc}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
