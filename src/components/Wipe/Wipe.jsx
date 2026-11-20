import { useEffect, useRef } from 'react'
import './Wipe.css'
import { onFrame, useMeasure } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { MONOGRAM, clamp } from '../../pixel.js'

// Pinned mask wipe: one geometric shape grows until it swallows the screen and flips the page.
// shape 'monogram' grows from the bar joining the two Gs; 'chevron' from inside its band.
const SHAPES = {
  monogram: { w: 10, h: 7, ox: 5, oy: 3.5, cover: 0.5, draw: (c) => MONOGRAM.forEach((r, y) => [...r].forEach((ch, x) => ch === '#' && c.rect(x - 0.02, y - 0.02, 1.04, 1.04))) },
  chevron: { w: 1, h: 0.85, ox: 0.5, oy: 0.65, cover: 0.14, draw: (c) => { c.moveTo(0, 0); c.lineTo(0.5, 0.45); c.lineTo(1, 0); c.lineTo(1, 0.4); c.lineTo(0.5, 0.85); c.lineTo(0, 0.4); c.closePath() } },
}

export default function Wipe({ shape, from, to, onProgress, children, className = '' }) {
  const root = useRef(null)
  const canvas = useRef(null)
  const m = useMeasure(root)
  const still = reducedMotion()

  useEffect(() => {
    if (still) return
    const cv = canvas.current, ctx = cv.getContext('2d')
    const S = SHAPES[shape]
    const css = getComputedStyle(document.documentElement)
    const bg = css.getPropertyValue(from).trim(), fg = css.getPropertyValue(to).trim()
    let W = 0, H = 0, dpr = 1, last = -1
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2)
      W = cv.offsetWidth; H = cv.offsetHeight
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr)
      last = -1
    }
    size()
    addEventListener('resize', size)

    const off = onFrame((y) => {
      const { top, height } = m.current
      if (y + innerHeight < top || y > top + height) return
      const p = clamp((y - top) / (height - innerHeight))
      if (p === last) return
      last = p
      onProgress?.(p)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (p > 0.985) { ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H); return }
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)
      // unit = on-screen size of one shape unit at rest; k grows exponentially so the push feels constant
      const unit = (Math.min(W, H) * 0.28) / S.w
      const kMax = (Math.hypot(W, H) / (unit * S.cover * 2)) * 1.15
      const k = Math.exp(Math.log(kMax) * Math.pow(p, 1.7))
      ctx.translate(W / 2, H / 2)
      ctx.scale(unit * k, unit * k)
      ctx.translate(-S.ox, -S.oy)
      ctx.beginPath()
      S.draw(ctx)
      ctx.fillStyle = fg
      ctx.fill()
    })
    return () => { off(); removeEventListener('resize', size) }
  }, [])

  if (still) return children ? <div className={`wipe-still ${className}`}>{children}</div> : null

  return (
    <div ref={root} className={`wipe ${className}`}>
      <div className="wipe-stage">
        <canvas ref={canvas} className="wipe-canvas" aria-hidden="true" />
        {children && <div className="wipe-over">{children}</div>}
      </div>
    </div>
  )
}
