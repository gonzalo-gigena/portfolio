import { Sticker } from './Sticker.jsx'
import { PixelIcon } from './PixelIcon.jsx'

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="pixel-dot" />
          <span>// portfolio_v.0426 — last build: 07.05.2026</span>
        </div>
        <h1>
          <span className="word gon">gon</span>
          <span className="word za">za</span>
          <span className="word lo">lo</span>
          <br />
          <span className="word gigena">gige</span>
          <span className="word alvarez">na </span>
          <span className="word strike alvarez">alvarez</span>
        </h1>
        <p className="hero-tag">
          <span className="a">backend</span>{" "}
          <span className="s">engineer</span>{" "}
          <span className="m">slash</span>{" "}
          <span className="p">recovering</span>{" "}
          <span className="s">competitive</span>{" "}
          <span className="a">programmer</span>{" "}
          <span className="m">currently</span>{" "}
          <span className="p">building</span>{" "}
          <span className="s">things</span>{" "}
          <span className="a">at</span>{" "}
          <span className="p">nexus</span>
          <span className="m">.</span>{" "}
          <span className="s">obsessed with</span>{" "}
          <span className="m">making the cursor weird.</span>
        </p>
        <div className="hero-meta">
          <div>based in<b>córdoba, ar</b></div>
          <div>working at<b>nexus / sf</b></div>
          <div>open to<b>chats &amp; coffee</b></div>
        </div>
      </div>
      <div className="hero-right">
        <div className="sticker-stage" id="stickerStage">
          <Sticker initial={{ x: 30, y: 60 }} rotate={-4} zIndex={3}>
            <div className="sticker-photo">
              <div className="photo-box" />
              <div className="cap">↑ insert face here</div>
            </div>
          </Sticker>
          <Sticker initial={{ x: 240, y: 30 }} rotate={6} zIndex={4}>
            <div className="sticker-pill">★ available q3 2026</div>
          </Sticker>
          <Sticker initial={{ x: 280, y: 110 }} rotate={-2} zIndex={5}>
            <div className="sticker-card">
              <div style={{ fontFamily: "VT323, monospace", fontSize: 18, color: "#a64a3a" }}>// note to self</div>
              <div>
                <span style={{ fontFamily: "Archivo Black, sans-serif" }}>ship</span>{" "}
                <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>more,</span>{" "}
                <span style={{ fontFamily: "VT323, monospace", fontSize: 16 }}>refactor less.</span>
              </div>
            </div>
          </Sticker>
          <Sticker initial={{ x: 60, y: 380 }} rotate={3} zIndex={2}>
            <div className="sticker-tag">★ rust enjoyer</div>
          </Sticker>
          <Sticker initial={{ x: 230, y: 320 }} rotate={-6} zIndex={6}>
            <div className="sticker-quote">
              <q>i am the cv</q>
              <span className="by">— probably said in 1987</span>
            </div>
          </Sticker>
          <Sticker initial={{ x: 380, y: 440 }} rotate={8} zIndex={3}>
            <div className="sticker-pixel">
              <PixelIcon kind="floppy" size={64} color="#3d6e6e" />
            </div>
          </Sticker>
          <Sticker initial={{ x: 30, y: 230 }} rotate={-8} zIndex={4}>
            <div className="sticker-pixel" style={{ background: "#1a1815" }}>
              <PixelIcon kind="skull" size={64} color="#e8e2d3" />
            </div>
          </Sticker>
          <Sticker initial={{ x: 420, y: 180 }} rotate={4} zIndex={2}>
            <div className="sticker-tag" style={{ background: "#3d6e6e" }}>EVM ⌁ NodeJS ⌁ Rust</div>
          </Sticker>
        </div>
      </div>
    </section>
  )
}
