import './Fx.css'
import { useEffect, useState, useRef } from 'react'

const GRIDS = {
  default: [
    "X...........",
    "XX..........",
    "XXX.........",
    "XXXX........",
    "XXXXX.......",
    "XXXXXX......",
    "XXXXXXX.....",
    "XXXX........",
    "XX.XX.......",
    "X..XX.......",
    "....XX......",
    "....XX......",
  ],
  hand: [
    "...XX.......",
    "..X..X......",
    "..X..X.XX...",
    "..X..XX..X..",
    "..X..X...X..",
    "XX.X.X..X...",
    "X..XXX.X....",
    "X.....X.....",
    "X....X......",
    ".X..X.......",
    "..XX........",
    "............",
  ],
  x: [
    "X.........X.",
    "XX.......XX.",
    ".XX.....XX..",
    "..XX...XX...",
    "...XX.XX....",
    "....XXX.....",
    "....XXX.....",
    "...XX.XX....",
    "..XX...XX...",
    ".XX.....XX..",
    "XX.......XX.",
    "X.........X.",
  ],
  spark: [
    ".....X......",
    ".....X......",
    "...X.X.X....",
    "....XXX.....",
    "XXXXXXXXXXX.",
    "....XXX.....",
    "...X.X.X....",
    ".....X......",
    ".....X......",
    "............",
    "............",
    "............",
  ],
}

const CURSOR_COLORS = { default: "#1a1815", hand: "#a64a3a", x: "#a64a3a", spark: "#c79b3a" }
const TRAIL_COLORS = ["#a64a3a", "#c79b3a", "#3d6e6e", "#1a1815"]
const PX = 2

function PixelSprite({ x, y, mode }) {
  const grid = GRIDS[mode] || GRIDS.default
  const c = CURSOR_COLORS[mode] || "#1a1815"
  return (
    <svg
      className="sprite-cursor"
      width={12 * PX}
      height={12 * PX}
      style={{ left: x - 2, top: y - 2 }}
      viewBox={`0 0 ${12 * PX} ${12 * PX}`}
      shapeRendering="crispEdges"
    >
      {grid.map((row, ry) =>
        row.split("").map((cell, cx) => {
          if (cell !== "X") return null
          return (
            <rect
              key={`o-${ry}-${cx}`}
              x={cx * PX - 1}
              y={ry * PX - 1}
              width={PX + 2}
              height={PX + 2}
              fill="#e8e2d3"
            />
          )
        })
      )}
      {grid.map((row, ry) =>
        row.split("").map((cell, cx) => {
          if (cell !== "X") return null
          return (
            <rect
              key={`p-${ry}-${cx}`}
              x={cx * PX}
              y={ry * PX}
              width={PX}
              height={PX}
              fill={c}
            />
          )
        })
      )}
    </svg>
  )
}

export function CursorLayer() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [mode, setMode] = useState("default")
  const trailRef = useRef([])
  const posRef = useRef({ x: -100, y: -100 })
  const [, force] = useState(0)

  const detectMode = (x, y) => {
    const el = document.elementFromPoint(x, y)
    if (!el) return "default"
    if (el.closest("a, button, .entry, .post, .sticker, .tg-links a")) return "hand"
    if (el.closest(".contact")) return "x"
    if (el.closest(".writing")) return "spark"
    return "default"
  }

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX, y = e.clientY
      posRef.current = { x, y }
      setPos({ x, y })
      setMode(detectMode(x, y))
      trailRef.current.push({ x, y, t: Date.now() })
      if (trailRef.current.length > 14) trailRef.current.shift()
      force((n) => n + 1)
    }
    const onScroll = () => {
      trailRef.current = []
      const { x, y } = posRef.current
      setMode(detectMode(x, y))
      force((n) => n + 1)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const cutoff = Date.now() - 600
      trailRef.current = trailRef.current.filter((p) => p.t > cutoff)
      force((n) => n + 1)
    }, 60)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {trailRef.current.map((p, i) => {
        const age = (Date.now() - p.t) / 600
        const size = Math.max(2, 8 - age * 8)
        return (
          <div
            key={i}
            className="cursor-trail"
            style={{
              left: p.x - size / 2,
              top: p.y - size / 2,
              width: size,
              height: size,
              background: TRAIL_COLORS[i % TRAIL_COLORS.length],
              opacity: 1 - age,
            }}
          />
        )
      })}
      <PixelSprite x={pos.x} y={pos.y} mode={mode} />
    </>
  )
}

export function Konami() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ]
    let i = 0
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (k === seq[i]) {
        i++
        if (i === seq.length) { setShow(true); i = 0 }
      } else {
        i = k === seq[0] ? 1 : 0
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  if (!show) return null
  return (
    <div className="konami show" onClick={() => setShow(false)}>
      <div className="konami-box" onClick={(e) => e.stopPropagation()}>
        <h3>** secret unlocked **</h3>
        <pre className="ascii">{`  /\\_/\\\n ( o.o )\n  > ^ <`}</pre>
        <p>
          you found the konami. as a reward,<br />
          here&apos;s a cat. it does not do anything.<br />
          <span style={{ opacity: 0.6 }}>// gonzalo says hi</span>
        </p>
        <button onClick={() => setShow(false)}>[ close ]</button>
      </div>
    </div>
  )
}

export function Disruptors() {
  const firedRef = useRef(new Set())
  const lastShakeRef = useRef(0)

  useEffect(() => {
    const fire = (node, ms = 1400) => {
      document.body.appendChild(node)
      setTimeout(() => node.remove(), ms)
    }

    const tear = (msg = "// breaking") => {
      const el = document.createElement("div")
      el.className = "glitch-tear"
      el.dataset.msg = msg
      el.style.top = `${20 + Math.random() * 60}%`
      fire(el, 800)
    }

    const flash = () => {
      const el = document.createElement("div")
      el.className = "flash"
      fire(el, 250)
    }

    const shake = () => {
      const now = Date.now()
      if (now - lastShakeRef.current < 800) return
      lastShakeRef.current = now
      const page = document.querySelector(".page")
      if (!page) return
      page.classList.add("shaking")
      setTimeout(() => page.classList.remove("shaking"), 450)
    }

    const smashStamp = (text, variant) => {
      const el = document.createElement("div")
      el.className = `smash-stamp ${variant || ""}`
      el.textContent = text
      el.style.top = `${20 + Math.random() * 50}%`
      el.style.left = `${5 + Math.random() * 40}%`
      fire(el, 1500)
    }

    const walker = (reverse = false) => {
      const el = document.createElement("div")
      el.className = `walker ${reverse ? "reverse" : ""}`
      el.style.top = `${30 + Math.random() * 50}%`
      const sprites = [
        '<svg width="48" height="48" viewBox="0 0 12 12" shape-rendering="crispEdges" style="display:block"><g fill="#a64a3a"><rect x="3" y="1" width="6" height="2"/><rect x="2" y="3" width="8" height="3"/><rect x="3" y="6" width="2" height="2"/><rect x="7" y="6" width="2" height="2"/><rect x="2" y="8" width="8" height="2"/><rect x="2" y="10" width="2" height="2"/><rect x="8" y="10" width="2" height="2"/></g></svg>',
        '<svg width="48" height="48" viewBox="0 0 12 12" shape-rendering="crispEdges" style="display:block"><g fill="#3d6e6e"><rect x="4" y="0" width="4" height="2"/><rect x="3" y="2" width="6" height="3"/><rect x="2" y="5" width="8" height="2"/><rect x="3" y="7" width="2" height="3"/><rect x="7" y="7" width="2" height="3"/><rect x="2" y="10" width="3" height="2"/><rect x="7" y="10" width="3" height="2"/></g></svg>',
        '<svg width="48" height="48" viewBox="0 0 12 12" shape-rendering="crispEdges" style="display:block"><g fill="#efd02b"><rect x="2" y="2" width="8" height="2"/><rect x="2" y="4" width="2" height="6"/><rect x="8" y="4" width="2" height="6"/><rect x="2" y="10" width="8" height="2"/><rect x="4" y="6" width="4" height="2"/></g></svg>',
      ]
      el.innerHTML = `<span class="bob">${sprites[Math.floor(Math.random() * sprites.length)]}</span>`
      fire(el, 4200)
    }

    const debris = (count = 14) => {
      const chars = ["★", "✂", "#", "▓", "░", "█", "x", "◆", "→", "↘", "//", "§", "¶", "∎"]
      const variants = ["", "punk", "teal", "ink"]
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div")
        el.className = `debris ${variants[Math.floor(Math.random() * variants.length)]}`
        el.textContent = chars[Math.floor(Math.random() * chars.length)]
        el.style.left = `${Math.random() * 100}%`
        el.style.fontSize = `${18 + Math.random() * 24}px`
        el.style.animationDelay = `${Math.random() * 0.6}s`
        el.style.animationDuration = `${1.6 + Math.random() * 1.4}s`
        fire(el, 3200)
      }
    }

    const crashbar = (text) => {
      const el = document.createElement("div")
      el.className = "crashbar"
      el.style.top = `${30 + Math.random() * 30}%`
      const inner = document.createElement("div")
      inner.className = "cb"
      const seg = `<span>${text}</span><b>★</b><em>· stop scrolling ·</em><span>${text}</span><b>★</b><em>· no don't ·</em>`
      inner.innerHTML = seg + seg + seg + seg
      el.appendChild(inner)
      fire(el, 1300)
    }

    const configs = {
      now:        { stamp: "BULLETIN.", variant: "punk", tear: "// section b", bar: null, debris: false },
      stack:      { stamp: "INVENTORY!!", variant: "", tear: "// classified", bar: "TOOLS · TOOLS · TOOLS", debris: true },
      experience: { stamp: "CAREERS//", variant: "teal", tear: "// careers desk", bar: null, debris: false },
      press:      { stamp: "ARCHIVES", variant: "punk", tear: "// dispatch", bar: "PHOTO MORGUE · PHOTO MORGUE", debris: false },
      notes:      { stamp: "MARGINALIA?", variant: "", tear: "// from the margins", bar: null, debris: true },
      contact:    { stamp: "STOP.", variant: "punk", tear: "// transmission", bar: "TELEGRAM · TELEGRAM", debris: true },
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const id = e.target.id
        if (firedRef.current.has(id)) return
        firedRef.current.add(id)
        const cfg = configs[id]
        if (!cfg) return

        flash()
        tear(cfg.tear)
        setTimeout(() => shake(), 80)
        setTimeout(() => smashStamp(cfg.stamp, cfg.variant), 180)
        setTimeout(() => walker(Math.random() < 0.5), 350)
        if (cfg.bar) setTimeout(() => crashbar(cfg.bar), 500)
        if (cfg.debris) setTimeout(() => debris(16), 250)
        if (Math.random() < 0.4) setTimeout(() => walker(true), 1500)
        setTimeout(() => flash(), 700)
      })
    }, { threshold: 0.22, rootMargin: "0px 0px -10% 0px" })

    document.querySelectorAll("section[id]").forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let alive = true
    const loop = async () => {
      while (alive) {
        const wait = 6000 + Math.random() * 7000
        await new Promise((r) => setTimeout(r, wait))
        if (!alive) return
        if (window.scrollY < window.innerHeight * 0.3) continue
        const r = Math.random()
        if (r < 0.4) {
          const el = document.createElement("div")
          el.className = "glitch-tear"
          el.dataset.msg = ["// signal lost", "// retry", "// 404", "// not found", "// glitch", "// nope"][Math.floor(Math.random() * 6)]
          el.style.top = `${10 + Math.random() * 80}%`
          document.body.appendChild(el)
          setTimeout(() => el.remove(), 800)
        } else if (r < 0.7) {
          const el = document.createElement("div")
          el.className = `walker ${Math.random() < 0.5 ? "reverse" : ""}`
          el.style.top = `${20 + Math.random() * 70}%`
          el.innerHTML = `<span class="bob"><svg width="36" height="36" viewBox="0 0 12 12" shape-rendering="crispEdges"><g fill="#a64a3a"><rect x="3" y="1" width="6" height="2"/><rect x="2" y="3" width="8" height="3"/><rect x="3" y="6" width="2" height="2"/><rect x="7" y="6" width="2" height="2"/><rect x="2" y="8" width="8" height="2"/><rect x="2" y="10" width="2" height="2"/><rect x="8" y="10" width="2" height="2"/></g></svg></span>`
          document.body.appendChild(el)
          setTimeout(() => el.remove(), 4200)
        } else {
          const chars = ["★", "✂", "//", "▓", "◆"]
          for (let i = 0; i < 5; i++) {
            const el = document.createElement("div")
            el.className = `debris ${["", "punk", "teal", "ink"][Math.floor(Math.random() * 4)]}`
            el.textContent = chars[Math.floor(Math.random() * chars.length)]
            el.style.left = `${Math.random() * 100}%`
            el.style.fontSize = `${18 + Math.random() * 18}px`
            el.style.animationDelay = `${Math.random() * 0.5}s`
            document.body.appendChild(el)
            setTimeout(() => el.remove(), 3000)
          }
        }
      }
    }
    loop()
    return () => { alive = false }
  }, [])

  return null
}
