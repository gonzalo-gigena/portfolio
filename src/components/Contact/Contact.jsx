import './Contact.css'
import { Reveal } from '../Reveal/Reveal.jsx'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal className="tg-card" tilt>
        <div className="tg-head">
          <div>telegram · cba/ar → world</div>
          <div className="center">— urgent transmission —</div>
          <div className="right">no. 0426 · prepaid</div>
        </div>
        <div className="tg-body">
          <div className="tg-msg">
            <span className="b">to:</span> any reader of this paper{" "}
            <span className="stop">stop</span><br />
            <span className="b">from:</span> g. gigena, córdoba{" "}
            <span className="stop">stop</span><br />
            <span className="hl">say hi</span>{" "}
            <span className="stop">stop</span><br />
            mornings for code{" "}
            <span className="stop">stop</span>{" "}
            evenings for{" "}
            <span style={{ fontFamily: "VT323, monospace", textTransform: "none", letterSpacing: 0, color: "#a64a3a", fontSize: 22 }}>// thinking</span>{" "}
            <span className="stop">stop</span><br />
            three languages — es, en, de{" "}
            <span className="stop">stop</span>{" "}
            two coffees a day{" "}
            <span className="stop">stop</span>{" "}
            one cat{" "}
            <span className="stop">stop</span><br />
            <span className="b">end of message</span>{" "}
            <span className="stop">stop</span>
          </div>
          <div className="tg-links">
            <div className="label">→ direct lines</div>
            <a href="mailto:gonzalo.gigena.alvarez@gmail.com">email<span className="arr">↗</span></a>
            <a href="https://github.com/gonzalo-gigena">github<span className="arr">↗</span></a>
            <a href="https://linkedin.com/in/gonzalo-gigena">linkedin<span className="arr">↗</span></a>
            <div style={{ marginTop: 16, fontFamily: "Special Elite, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>
              psst — try ↑ ↑ ↓ ↓ ← → ← → b a
            </div>
          </div>
        </div>
        <div className="tg-foot">
          <span>filed: 05/08/2026 · 10:42 art</span>
          <span className="stamp ink">authentic</span>
          <span>operator: gg-001</span>
        </div>
      </Reveal>
    </section>
  )
}
