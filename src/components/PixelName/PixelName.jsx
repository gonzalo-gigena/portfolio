import { useEffect, useRef } from 'react'
import './PixelName.css'
import { onFrame } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { rowsOf, cellsOf, seeded, clamp, easeOut } from '../../pixel.js'

const ENTER_MS = 1500

// The name in the bitmap face, on canvas. Pixels arrive scattered and snap into letters on load;
// scrolling out of the hero breaks them apart again (scrubbed, not timed).
export default function PixelName({ lines }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const rows = rowsOf(lines)
    const cols = rows[0].length
    const rnd = seeded(11)
    const parts = cellsOf(rows).map(([cx, cy]) => ({
      cx, cy,
      sx: rnd(), sy: rnd(), d: rnd() * 0.45,
      vx: (rnd() - 0.5) * 1.6, vy: -0.3 - rnd() * 1.1, spin: rnd(),
    }))
    const still = reducedMotion()
    let W = 0, H = 0, dpr = 1, cell = 0, ox = 0, oy = 0, ink = '#0e0e0e', key = ''
    const t0 = performance.now()

    const size = () => {
      const r = host.getBoundingClientRect()
      dpr = Math.min(devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      const cs = getComputedStyle(host)
      const v = (name, d) => parseFloat(cs.getPropertyValue(name)) || d
      const m = v('--margin', 24)
      const crop = v('--wm-crop', 0) // rows of the last line pushed below the bottom edge
      const lift = v('--wm-lift', 0) // px kept clear above the bottom edge
      ink = cs.color
      cell = Math.min(((W - 2 * m) * v('--wm-scale', 1)) / cols, (H * 0.6) / (rows.length - crop))
      ox = m
      oy = H - lift - (rows.length - crop) * cell
      host.style.setProperty('--wm-h', `${Math.round(H - oy)}px`)
      key = ''
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(host)

    const off = onFrame((y, now) => {
      if (y > H * 1.1) return
      const e = still ? 1 : clamp((now - t0) / ENTER_MS)
      const b = still ? 0 : clamp(y / (H * 0.8))
      const k = `${e.toFixed(4)}|${b.toFixed(4)}`
      if (k === key) return
      key = k
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = ink
      const bb = b * b
      for (const p of parts) {
        const a = easeOut(clamp((e - p.d) / 0.55))
        const tx = ox + p.cx * cell, ty = oy + p.cy * cell
        const sx = p.sx * W, sy = p.sy * H
        const x = sx + (tx - sx) * a + p.vx * bb * W * 0.45
        const yy = sy + (ty - sy) * a + p.vy * bb * H * 0.9
        const s = cell * (0.35 + 0.65 * a) * (1 - 0.55 * bb * p.spin)
        // snap both edges to device pixels so neighbouring cells share an edge (no anti-aliased seams)
        const X = Math.round(x * dpr) / dpr, Y = Math.round(yy * dpr) / dpr
        ctx.fillRect(X, Y, Math.round((x + s) * dpr) / dpr - X, Math.round((yy + s) * dpr) / dpr - Y)
      }
    })
    return () => { off(); ro.disconnect() }
  }, [lines])

  return <canvas ref={ref} className="pixel-name" aria-hidden="true" />
}
