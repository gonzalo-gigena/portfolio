import { Reveal } from './Reveal.jsx'

const CLIPS = [
  { img: "a", title_a: "satellite", title_s: " stares ", title_p: "back", cap: "synthetic dataset, generated in unity for the thesis. lighting is hard.", src: "thesis · 2024" },
  { img: "b", title_a: "icpc", title_s: " regional ", title_p: "2020", cap: "team photo, mid-debug. one sandwich, three problems unsolved.", src: "south america · 2020" },
  { img: "c", title_a: "blockchain ", title_s: "is ", title_p: "weird", cap: "experimenting with EVM bindings on a long weekend.", src: "nexus · 2026" },
  { img: "d", title_a: "epps ", title_s: "circa ", title_p: "2022", cap: "one of about forty material ui dashboards. sorry, design system.", src: "leniolabs · 2022" },
  { img: "e", title_a: "the ", title_s: "great ", title_p: "yaml", cap: "every modern engineer eventually meets their personal yaml. mine has 412 lines.", src: "ongoing · forever" },
  { img: "a", title_a: "compile ", title_s: "or ", title_p: "die", cap: "a self-portrait, in the style of a borrow checker.", src: "rust · q4 2025" },
]

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
        {CLIPS.map((c, i) => (
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
