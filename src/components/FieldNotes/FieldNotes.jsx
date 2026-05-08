import './FieldNotes.css'
import { Reveal } from '../Reveal/Reveal.jsx'

const NOTES = [
  { when: "monday · 09:42", q: <>most bugs are <em>just</em> two functions <span className="alt">disagreeing politely.</span></>, by: "g.g · field notebook" },
  { when: "tuesday · 14:11", q: <>the <em>rust compiler</em> is the only friend i have who tells me the truth and means it.</>, by: "g.g · self-roast" },
  { when: "wednesday · 23:58", q: <>shipping is a <span className="alt">muscle.</span> rest, but stretch.</>, by: "g.g · post-deploy" },
  { when: "friday · 06:00", q: <>everything looks <em>elegant</em> at 6am. then you eat breakfast.</>, by: "g.g · pre-coffee" },
]

export function FieldNotes() {
  return (
    <section className="section field-notes" id="notes">
      <Reveal className="section-head">
        <span className="lbl">/ section f · field notes</span>
        <h2>
          <span style={{ fontFamily: "Archivo Black, sans-serif" }}>found </span>
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", color: "var(--brick)" }}>in the </span>
          <span style={{ fontFamily: "VT323, monospace", color: "var(--teal)" }}>margins.</span>
        </h2>
        <div className="right">overheard ·<br />self-overheard</div>
      </Reveal>
      <Reveal className="notes-grid stagger">
        {NOTES.map((n, i) => (
          <div className="note" key={i}>
            <span className="when">{n.when}</span>
            <q>{n.q}</q>
            <span className="by">— {n.by}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
