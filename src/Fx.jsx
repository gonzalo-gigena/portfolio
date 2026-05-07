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
    if (el.closest("a, button, .entry, .post, .sticker, .contact-links a")) return "hand"
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
      console.log(k)
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
