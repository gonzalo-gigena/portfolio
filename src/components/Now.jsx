import { Reveal } from './Reveal.jsx'
import { AnimPixelIcon } from './PixelIcon.jsx'

const CARDS = [
  { tag: "// shipping", title_a: "nexus", title_b: " backend", body: "designing apis + databases against the nexus EVM. node, rust, gcp, lots of caffeine.", icon: "bolt", color: "#a64a3a", tape: "top" },
  { tag: "// reading", title_a: "designing data-", title_b: "intensive apps", body: "for the third time. yes the bird book. it gets better every pass.", icon: "coffee", color: "#3d6e6e", tape: "tl" },
  { tag: "// learning", title_a: "more rust,", title_b: " less suffering", body: "lifetimes are starting to make sense. ask me again in q4.", icon: "diamond", color: "#c79b3a", tape: "tr" },
  { tag: "// listening", title_a: "boards of canada", title_b: " / aphex", body: "fits the dithered-monitor vibe. on loop while debugging.", icon: "moon", color: "#1a1815", tape: "top" },
  { tag: "// missing", title_a: "competitive", title_b: " programming", body: "icpc 2019–2021 was peak brain. now i debug yaml instead.", icon: "star", color: "#a64a3a", tape: "tl" },
  { tag: "// side quest", title_a: "this site,", title_b: " on weekends", body: "every sticker is draggable. yes you can drag them off-screen. don't.", icon: "heart", color: "#c79b3a", tape: "tr" },
]

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
        {CARDS.map((c, i) => (
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
