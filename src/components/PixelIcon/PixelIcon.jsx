import './PixelIcon.css'
import { useEffect, useState } from 'react'
import { ICON_GRIDS } from './pixelIcon.data.js'

export { ICON_GRIDS }

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
