import { useEffect, useState, useRef } from 'react'
import { CursorLayer, Konami } from './Fx.jsx'

const ICON_GRIDS = {
  diamond: [
    "....XX....",
    "...XXXX...",
    "..XXXXXX..",
    ".XXXXXXXX.",
    "XXXXXXXXXX",
    ".XXXXXXXX.",
    "..XXXXXX..",
    "...XXXX...",
    "....XX....",
    "..........",
  ],
  star: [
    "....XX....",
    "....XX....",
    "X...XX...X",
    "XX..XX..XX",
    ".XXXXXXXX.",
    "..XXXXXX..",
    ".XX.XX.XX.",
    "XX..XX..XX",
    "X...XX...X",
    "....XX....",
  ],
  heart: [
    ".XX..XX...",
    "XXXXXXXX..",
    "XXXXXXXX..",
    "XXXXXXXX..",
    ".XXXXXX...",
    "..XXXX....",
    "...XX.....",
    "..........",
    "..........",
    "..........",
  ],
  bolt: [
    "...XXXX...",
    "..XXXX....",
    ".XXXX.....",
    "XXXXXXX...",
    "..XXXX....",
    ".XXXX.....",
    "XXXX......",
    "XXX.......",
    "XX........",
    "X.........",
  ],
  skull: [
    ".XXXXXX...",
    "XXXXXXXX..",
    "XX.XX.XX..",
    "XX.XX.XX..",
    "XXXXXXXX..",
    ".X.XX.X...",
    ".XXXXXX...",
    ".X.XX.X...",
    "..........",
    "..........",
  ],
  coffee: [
    "XXXXXXX...",
    "X.....XXX.",
    "X.....X.X.",
    "X.....XXX.",
    "X.....X...",
    "XXXXXXX...",
    ".XXXXX....",
    "..........",
    "..........",
    "..........",
  ],
  moon: [
    "..XXX.....",
    ".XXXXX....",
    "XXXXX.....",
    "XXXX......",
    "XXXX......",
    "XXXX......",
    "XXXXX.....",
    ".XXXXX....",
    "..XXX.....",
    "..........",
  ],
  floppy: [
    "XXXXXXXXXX",
    "X.XXXXXX.X",
    "X.XXXXXX.X",
    "X.XXXXXX.X",
    "X........X",
    "X.XXXXXX.X",
    "X.X....X.X",
    "X.X....X.X",
    "X.X....X.X",
    "XXXXXXXXXX",
  ],
}

function PixelIcon({ kind = "diamond", size = 32, color = "#a64a3a" }) {
  const g = ICON_GRIDS[kind] || ICON_GRIDS.diamond
  const px = size / 10
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" style={{ display: "block" }}>
      {g.map((row, ry) =>
        row.split("").map((cell, cx) => {
          if (cell !== "X") return null
          return <rect key={`${ry}-${cx}`} x={cx * px} y={ry * px} width={px} height={px} fill={color} />
        })
      )}
    </svg>
  )
}

function AnimPixelIcon({ kind, color }) {
  const [hover, setHover] = useState(false)
  const [t, setT] = useState(0)
  useEffect(() => {
    if (!hover) return
    const id = setInterval(() => setT((n) => n + 1), 120)
    return () => clearInterval(id)
  }, [hover])
  return (
    <div
      className="pixel-icon"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? `translateY(${t % 2 === 0 ? -2 : 0}px) rotate(${(t % 4) * 4 - 6}deg)` : "none",
        transition: "transform 0.1s steps(2)",
      }}
    >
      <PixelIcon kind={kind} size={28} color={color} />
    </div>
  )
}

function Sticker({ initial, rotate = 0, zIndex = 1, children }) {
  const [pos, setPos] = useState(initial)
  const [drag, setDrag] = useState(null)
  const [z, setZ] = useState(zIndex)

  const onDown = (e) => {
    e.preventDefault()
    const p = e.touches ? e.touches[0] : e
    setDrag({ x: p.clientX - pos.x, y: p.clientY - pos.y })
    setZ(50)
  }

  useEffect(() => {
    if (!drag) return
    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e
      setPos({ x: p.clientX - drag.x, y: p.clientY - drag.y })
    }
    const onUp = () => setDrag(null)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [drag])

  return (
    <div
      className="sticker"
      style={{ left: pos.x, top: pos.y, zIndex: z, transform: `rotate(${rotate}deg)`, "--r": `${rotate}deg` }}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {children}
    </div>
  )
}
function Hero() {
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

function MarqueeBar() {
  const items = (
    <span>
      <b>NOW PLAYING</b>
      <em>· nexus backend · </em>
      <b>★</b><em> rust + nodejs + firestore </em>
      <b>★</b><em> evm bindings </em>
      <b>★</b><em> distributed systems </em>
      <b>★</b><em> still bad at css </em>
      <b>★</b><em> still good at sql </em>
      <b>★ </b>
    </span>
  )
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items}{items}{items}
      </div>
    </div>
  )
}

const NOW_CARDS = [
  { tag: "// shipping", title: "nexus backend", body: "designing apis + databases against the nexus EVM. node, rust, gcp, lots of caffeine.", icon: "bolt", color: "#a64a3a" },
  { tag: "// reading", title: "designing data-intensive applications", body: "for the third time. yes the bird book. it gets better every pass.", icon: "coffee", color: "#3d6e6e" },
  { tag: "// learning", title: "more rust, less suffering", body: "lifetimes are starting to make sense. ask me again in q4.", icon: "diamond", color: "#c79b3a" },
  { tag: "// listening", title: "boards of canada / aphex", body: "fits the dithered-monitor vibe. on loop while debugging.", icon: "moon", color: "#1a1815" },
  { tag: "// missing", title: "competitive programming", body: "icpc 2019–2021 was peak brain. now i debug yaml instead.", icon: "star", color: "#a64a3a" },
  { tag: "// side quest", title: "this site, on weekends", body: "every sticker is draggable. yes you can drag them off-screen. don't.", icon: "heart", color: "#c79b3a" },
]

function Now() {
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

const ENTRIES = [
  {
    when: "apr 2026 → present",
    role: "Backend Engineer",
    at: "Nexus",
    where: "san francisco · remote from córdoba",
    bullets: [
      "designing & implementing backend services + apis (NodeJS, Rust)",
      "data models + persistence on GCP / Firestore",
      "integrating internal systems against the Nexus EVM blockchain",
      "deployment, monitoring, the whole observability dance",
    ],
    stack: ["NodeJS", "Rust", "Firestore", "GCP", "EVM"],
  },
  {
    when: "oct 2023 → mar 2026",
    role: "AI Training / Prompt Engineer",
    at: "Outlier",
    where: "remote",
    bullets: [
      "reviewed + optimized python code generated by llms",
      "designed evaluation prompts to surface model weaknesses",
      "generated training data on debugging, perf, best practices",
      "pandas / matplotlib / scipy / data analysis workflows",
    ],
    stack: ["Python", "pandas", "scipy", "LLMs"],
  },
  {
    when: "oct 2021 → oct 2022",
    role: "Software Engineer",
    at: "Leniolabs",
    where: "santiago, cl · for ICE Mortgage Tech",
    bullets: [
      "built user-facing features for EPPS in React",
      "reusable UI components on top of Material UI",
      "WCAG accessibility compliance work",
      "refactored a lot of legacy frontend into something readable",
      "CI/CD with GitHub Actions + Jenkins",
    ],
    stack: ["React", "Material UI", "GH Actions", "Jenkins"],
  },
  {
    when: "oct 2019 → oct 2021",
    role: "Full-Stack Engineer",
    at: "Zenrise",
    where: "córdoba, ar",
    bullets: [
      "react dashboards + matching backend functionality",
      "REST services in Java Spring Boot",
      "async pipelines for payments + 3rd-party banking integrations",
      "secure apis with node, express, mongo",
      "sql + nosql schema design and query optimization",
    ],
    stack: ["React", "Spring Boot", "Node", "Mongo", "SQL"],
  },
  {
    when: "2017 → 2024",
    role: "B.Sc + M.Sc Computer Science",
    at: "FaMAF, UNC",
    where: "córdoba, argentina · gpa 8.3",
    bullets: [
      "thesis: computer vision methods for satellite pose estimation",
      "synthetic datasets in unity + c#, simulating satellite imagery",
      "trained CNNs in tensorflow, integrated real data from u. de chile",
      "associate teacher of competitive programming (2019)",
    ],
    stack: ["TensorFlow", "Unity / C#", "Python", "C++"],
  },
  {
    when: "2018 → 2021",
    role: "Competitive Programming",
    at: "ACM-ICPC + Torneo Argentino",
    where: "south america regional",
    bullets: [
      "icpc south america regional 2019–2021",
      "torneo argentino de programación 2018–2020",
      "miss it every day. would not do it again.",
    ],
    stack: ["C++", "algorithms", "regret"],
  },
]

function Experience() {
  return (
    <section className="section exp" id="experience">
      <span className="section-label">/ experience</span>
      <h2>
        <span className="a">where</span>{" "}
        <span className="s">i&apos;ve</span>{" "}
        <span className="p">been</span>{" "}
        <span className="m">·</span>{" "}
        <span className="s">what</span>{" "}
        <span className="a">broke</span>.
      </h2>
      <div className="timeline">
        {ENTRIES.map((e, i) => (
          <div className="entry" key={i}>
            <div className="when">{e.when}</div>
            <div className="role">
              <h3>{e.role}</h3>
              <span className="at">@ {e.at}</span>
            </div>
            <div className="where">{e.where}</div>
            <ul>
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
            <div className="stack">
              {e.stack.map((s, j) => <span className="chip" key={j}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const POSTS = [
  { date: "04.18.2026", read: "8 min", title_a: "teaching", title_s: "an EVM ", title_p: "to behave", body: "notes on integrating the nexus chain with a node backend without losing your mind (or your gas)." },
  { date: "02.02.2026", read: "5 min", title_a: "satellites", title_s: " and ", title_p: "synthetic data", body: "what i learned generating fake space photos in unity for my thesis. mostly: lighting is hard." },
  { date: "11.30.2025", read: "12 min", title_a: "the ", title_s: "quiet death ", title_p: "of icpc brain", body: "competitive programming gave me reflexes i no longer use. here's what i kept." },
  { date: "08.15.2025", read: "6 min", title_a: "rust ", title_s: "isn't", title_p: " hard, you are", body: "(i am.) a self-roast in four lifetimes." },
]

function Writing() {
  return (
    <section className="section writing" id="writing">
      <span className="section-label">/ writing</span>
      <h2>
        <span className="a">notes</span>{" "}
        <span className="s">from</span>{" "}
        <span className="p">the</span>{" "}
        <span className="a">terminal</span>.
      </h2>
      <div className="posts">
        {POSTS.map((p, i) => (
          <article className="post" key={i}>
            <div className="meta"><span>{p.date}</span><span>{p.read}</span></div>
            <h3>
              <span className="a">{p.title_a}</span>
              <span className="s">{p.title_s}</span>
              <span className="p">{p.title_p}</span>
            </h3>
            <p>{p.body}</p>
            <div className="read">read it <span className="arrow">→</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
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
          <a href="#">linkedin / in/gonzalogigena<span className="arr">↗</span></a>
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

function Topbar() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = t.toTimeString().slice(0, 8)
  return (
    <div className="topbar">
      <div className="left">
        <span className="blink">●</span>
        <span>gonzalo.exe</span>
        <span style={{ opacity: 0.6 }}>// 256kb free</span>
      </div>
      <nav>
        <a href="#now">now</a>
        <a href="#experience">work</a>
        <a href="#writing">writing</a>
        <a href="#contact">contact</a>
      </nav>
      <div style={{ opacity: 0.7 }}>{time} · cba/ar</div>
    </div>
  )
}

function Footer() {
  return (
    <div className="foot">
      <div>© 2026 gonzalo gigena alvarez · <span className="blink">∎</span> hand-coded, no css framework was harmed</div>
      <div>v0.426 · last seen: just now</div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="dither-bg" />
      <Topbar />
      <main className="page">
        <Hero />
        <div className="glitch-divider" />
        <MarqueeBar />
        <Now />
        <div className="glitch-divider" />
        <Experience />
        <div className="glitch-divider" />
        <Writing />
        <Contact />
        <Footer />
      </main>
      <div className="vignette" />
      <div className="scanlines" />
      <div className="flicker" />
      <CursorLayer />
      <Konami />
    </>
  )
}
