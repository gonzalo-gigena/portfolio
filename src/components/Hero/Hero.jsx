import './Hero.css'
import { RansomNote } from '../RansomNote/RansomNote.jsx'
import { Reveal } from '../Reveal/Reveal.jsx'
import { Sticker } from '../Sticker/Sticker.jsx'
import { PixelIcon } from '../PixelIcon/PixelIcon.jsx'

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="parallax-char" style={{ top: 80, right: -60 }}>G</div>
      <div className="front-page">
        <div>
          <Reveal className="kicker" tilt>★ breaking · 05 / 08 / 26 · vol iii ★</Reveal>
          <h1 className="headline">
            <RansomNote text="local dev still" seed={3} animate />
            <br />
            <RansomNote text="building things" seed={11} animate />
            <br />
            <RansomNote text="on purpose." seed={7} animate />
          </h1>
          <Reveal as="p" className="deck">
            <span className="a">Gonzalo Gigena Alvarez</span>, 27, of Córdoba —
            backend engineer, former competitive programmer, M.Sc. in Computer Science —
            currently shipping backend services for <span className="p">nexus</span>, an EVM blockchain headquartered in San Francisco.
          </Reveal>
          <Reveal className="byline">
            <span>by the editor</span>
            <span>filed under: careers</span>
            <span>category a · pg-13</span>
            <span>reading time: ~3 min</span>
          </Reveal>
          <Reveal className="lede">
            <p>
              CÓRDOBA — <span className="a">G. Gigena</span> is a backend engineer
              focused on <span className="hl">distributed systems</span>, API design,
              and blockchain integrations, based in Argentina and working remotely.
            </p>
            <p>
              He is currently shipping backend services for{" "}
              <span className="p">nexus</span>, an EVM blockchain headquartered in San
              Francisco —{" "}
              <span className="s">&ldquo;the timezone is fine,&rdquo;</span> he said.
            </p>
            <p>
              Background includes a thesis on satellite pose estimation, three years of
              competitive programming, and full-stack work across multiple industries.
              Full details on page <span className="hl">B-7</span>: scroll down.
            </p>
          </Reveal>
          <Reveal className="statbar stagger">
            <div>based<b>córdoba, ar</b></div>
            <div>shipping<b>nexus / sf</b></div>
            <div>languages<b>es · en · de</b></div>
            <div>availability<b>chats &amp; coffee</b></div>
          </Reveal>
        </div>
        <div className="hero-right">
          <div className="sticker-stage" id="stickerStage">
            <Sticker initial={{ x: 28, y: 60 }} rotate={-4} zIndex={3} tape="tl">
              <div className="sticker-photo">
                <div className="photo-box" />
                <div className="cap">↑ insert face here</div>
              </div>
            </Sticker>
            <Sticker initial={{ x: 240, y: 30 }} rotate={6} zIndex={4} tape="top">
              <div className="sticker-pill">★ available q3 2026</div>
            </Sticker>
            <Sticker initial={{ x: 270, y: 130 }} rotate={-2} zIndex={5} tape="tr">
              <div className="sticker-card">
                <div style={{ fontFamily: "Special Elite, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a64a3a" }}>// note to self</div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: "Archivo Black, sans-serif" }}>ship</span>{" "}
                  <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>more,</span>{" "}
                  <span style={{ fontFamily: "VT323, monospace", fontSize: 16 }}>refactor less.</span>
                </div>
              </div>
            </Sticker>
            <Sticker initial={{ x: 50, y: 380 }} rotate={3} zIndex={2} tape="tl">
              <div className="sticker-tag">★ rust enjoyer</div>
            </Sticker>
            <Sticker initial={{ x: 220, y: 320 }} rotate={-6} zIndex={6} tape="top">
              <div className="sticker-quote">
                <q>build things <em>that</em> last</q>
                <span className="by">— g.g · 2026</span>
              </div>
            </Sticker>
            <Sticker initial={{ x: 380, y: 460 }} rotate={8} zIndex={3} tape="tr">
              <div className="sticker-pixel">
                <PixelIcon kind="floppy" size={64} color="#3d6e6e" />
              </div>
            </Sticker>
            <Sticker initial={{ x: 30, y: 230 }} rotate={-8} zIndex={4} tape="top">
              <div className="sticker-pixel" style={{ background: "#1a1815" }}>
                <PixelIcon kind="skull" size={64} color="#efd02b" />
              </div>
            </Sticker>
            <Sticker initial={{ x: 420, y: 200 }} rotate={4} zIndex={2} tape="top">
              <div className="sticker-tag" style={{ background: "#3d6e6e" }}>EVM ⌁ NodeJS ⌁ Rust</div>
            </Sticker>
            <div className="stamp-floating" style={{ right: 20, bottom: 60, transform: "rotate(8deg)" }}>
              <span className="stamp teal">authentic · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
