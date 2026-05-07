export function Contact() {
  return (
    <section className="contact" id="contact">
      <span className="section-label">/ contact</span>
      <h2>
        <span className="a">say</span>{" "}
        <span className="s">hi,</span>{" "}
        <span className="p">don&apos;t</span>{" "}
        <span className="strike s">be</span>{" "}
        <span className="a">weird</span>.
      </h2>
      <div className="contact-grid">
        <div className="contact-links">
          <a href="mailto:gonzalo.gigena.alvarez@gmail.com">gonzalo.gigena.alvarez@gmail.com<span className="arr">↗</span></a>
          <a href="#">linkedin / in/gonzalo-gigena<span className="arr">↗</span></a>
        </div>
        <div className="contact-blurb">
          <p>
            i reply faster than my <span className="p">git push</span>.{" "}
            mornings are for code, evenings are for <span className="m">// thinking</span>.
          </p>
          <p style={{ marginTop: 12 }}>
            three languages: <span className="p">es / en / de</span>.{" "}
            two coffees a day. one cat (allegedly).
          </p>
          <p style={{ marginTop: 12, fontFamily: "Space Mono, monospace", fontStyle: "normal", fontSize: 13 }}>
            psst — try ↑ ↑ ↓ ↓ ← → ← → b a
          </p>
        </div>
      </div>
    </section>
  )
}
