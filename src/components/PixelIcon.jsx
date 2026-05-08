import { useEffect, useState } from 'react'

export const ICON_GRIDS = {
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
  pin: [
    ".XXXXX....",
    ".X...X....",
    ".X...X....",
    "XXXXXXX...",
    "...X......",
    "...X......",
    "...X......",
    "...X......",
    "..........",
    "..........",
  ],
}

export function PixelIcon({ kind = "diamond", size = 32, color = "#a64a3a" }) {
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

export function AnimPixelIcon({ kind, color }) {
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
