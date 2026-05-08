import { Reveal } from './Reveal.jsx'

const ITEMS = [
  { num: "// 001", title_a: "Rust", title_b: "", desc: "for systems that should not crash. usually doesn't.", price: "$$$" },
  { num: "// 002", title_a: "Node", title_b: "JS", desc: "the lingua franca of \"just ship it.\"", price: "$$" },
  { num: "// 003", title_a: "Type", title_b: "Script", desc: "a love letter to the compiler.", price: "$$" },
  { num: "// 004", title_a: "Python", title_b: "", desc: "two years of pandas. it shows.", price: "$$" },
  { num: "// 005", title_a: "C", title_b: "++", desc: "competitive programming muscle memory.", price: "$" },
  { num: "// 006", title_a: "Java", title_b: " / Spring", desc: "boot beans. enterprise. you know.", price: "$" },
  { num: "// 007", title_a: "Postgres", title_b: "", desc: "still the right answer most of the time.", price: "$$$" },
  { num: "// 008", title_a: "Mongo", title_b: "DB", desc: "occasionally the right answer.", price: "$$" },
  { num: "// 009", title_a: "Fire", title_b: "store", desc: "documents pretending to be tables.", price: "$$" },
  { num: "// 010", title_a: "GCP", title_b: "", desc: "bigtable, run, storage, the usual suspects.", price: "$$$" },
  { num: "// 011", title_a: "EVM", title_b: "", desc: "writing humane apis on top of opcodes.", price: "$$" },
  { num: "// 012", title_a: "React", title_b: "", desc: "for when the ui matters. (it always matters.)", price: "$$" },
  { num: "// 013", title_a: "Tensor", title_b: "Flow", desc: "trained CNNs on synthetic satellite data.", price: "$$" },
  { num: "// 014", title_a: "Unity", title_b: " / C#", desc: "rendered fake space photos. shadows lie.", price: "$" },
  { num: "// 015", title_a: "GH", title_b: " Actions", desc: "the only ci/cd that didn't make me cry.", price: "$$" },
  { num: "// 016", title_a: "vim", title_b: "", desc: "i can't quit. literally.", price: "free" },
]

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
        {ITEMS.map((it, i) => (
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
