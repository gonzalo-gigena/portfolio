import { AnimPixelIcon } from './PixelIcon.jsx'

const NOW_CARDS = [
  { tag: "// shipping", title: "nexus backend", body: "designing apis + databases against the nexus EVM. node, rust, gcp, lots of caffeine.", icon: "bolt", color: "#a64a3a" },
  { tag: "// reading", title: "designing data-intensive applications", body: "for the third time. yes the bird book. it gets better every pass.", icon: "coffee", color: "#3d6e6e" },
  { tag: "// learning", title: "more rust, less suffering", body: "lifetimes are starting to make sense. ask me again in q4.", icon: "diamond", color: "#c79b3a" },
  { tag: "// listening", title: "boards of canada / aphex", body: "fits the dithered-monitor vibe. on loop while debugging.", icon: "moon", color: "#1a1815" },
  { tag: "// missing", title: "competitive programming", body: "icpc 2019–2021 was peak brain. now i debug yaml instead.", icon: "star", color: "#a64a3a" },
  { tag: "// side quest", title: "this site, on weekends", body: "every sticker is draggable. yes you can drag them off-screen. don't.", icon: "heart", color: "#c79b3a" },
]

export function Now() {
  return (
    <section className="section now" id="now">
      <div>
        <span className="section-label">/ now</span>
        <h2>
          <span className="a">currently</span>{" "}
          <span className="s">doing</span>{" "}
          <span className="p">stuff.</span>
        </h2>
      </div>
      <div className="now-grid">
        {NOW_CARDS.map((c, i) => (
          <div className="now-card" key={i}>
            <div className="tag">{c.tag}</div>
            <h4>{c.title}</h4>
            <p>{c.body}</p>
            <AnimPixelIcon kind={c.icon} color={c.color} />
          </div>
        ))}
      </div>
    </section>
  )
}
