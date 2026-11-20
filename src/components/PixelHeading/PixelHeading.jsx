import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import './PixelHeading.css'
import { onFrame, useMeasure } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { seeded, clamp, easeOut } from '../../pixel.js'

// A grotesk heading that assembles from scattered pixels, then hands over to the crisp live text.
// auto: progress follows the heading's own scroll position. Otherwise the parent drives it via ref.set(t).
const PixelHeading = forwardRef(function PixelHeading({ as: Tag = 'h2', id, className = '', auto = true, children }, api) {
  const text = useRef(null)
  const canvas = useRef(null)
  const drive = useRef(auto ? null : 0)
  const m = useMeasure(text)
  useImperativeHandle(api, () => ({ set: (t) => { drive.current = t } }), [])

  useEffect(() => {
    if (reducedMotion()) { text.current.style.opacity = 1; canvas.current.style.display = 'none'; return }
    const el = text.current, cv = canvas.current, ctx = cv.getContext('2d')
    let parts = [], W = 0, H = 0, pad = 0, dpr = 1, cell = 4, color = '#000', last = -1

    const build = () => {
      const cs = getComputedStyle(el)
      const w = el.offsetWidth, h = el.offsetHeight
      const fs = parseFloat(cs.fontSize)
      pad = fs * 1.4
      W = w + pad * 2; H = h + pad * 2
      dpr = Math.min(devicePixelRatio || 1, 2)
      Object.assign(cv.style, { left: `${-pad}px`, top: `${-pad}px`, width: `${W}px`, height: `${H}px` })
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr)
      color = cs.color

      // render the live text offscreen, then sample it on a coarse grid
      const off = document.createElement('canvas')
      off.width = Math.ceil(w); off.height = Math.ceil(h)
      const o = off.getContext('2d', { willReadFrequently: true })
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      if ('letterSpacing' in o) o.letterSpacing = cs.letterSpacing
      const mt = o.measureText(el.textContent)
      const lh = parseFloat(cs.lineHeight) || fs
      const asc = mt.fontBoundingBoxAscent ?? fs * 0.8, desc = mt.fontBoundingBoxDescent ?? fs * 0.2
      o.fillText(el.textContent, 0, (lh - (asc + desc)) / 2 + asc)
      const data = o.getImageData(0, 0, off.width, off.height).data
      cell = Math.max(3, Math.round(fs / 15))
      const rnd = seeded(el.textContent.length * 97)
      parts = []
      for (let y = 0; y < off.height; y += cell) {
        for (let x = 0; x < off.width; x += cell) {
          const i = ((Math.min(off.height - 1, y + (cell >> 1)) * off.width) + Math.min(off.width - 1, x + (cell >> 1))) * 4 + 3
          if (data[i] > 110) parts.push({ x: x + pad, y: y + pad, sx: rnd() * W, sy: rnd() * H, d: rnd() * 0.45 })
        }
      }
      last = -1
      if (!parts.length) { el.style.opacity = 1; cv.style.opacity = 0 } // nothing sampled: never leave the heading invisible
    }
    document.fonts.ready.then(build)
    const ro = new ResizeObserver(build)
    ro.observe(el)

    const offFrame = onFrame((y) => {
      let t
      if (drive.current === null) {
        const top = m.current.top - y
        if (top > innerHeight * 1.2 || top < -m.current.height - innerHeight) return
        t = clamp((innerHeight * 0.95 - top) / (innerHeight * 0.5))
      } else t = drive.current
      if (t === last || !parts.length) return
      last = t
      const live = clamp((t - 0.93) / 0.07)
      el.style.opacity = live
      cv.style.opacity = clamp(t * 5) * (1 - live)
      if (live === 1) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = color
      for (const p of parts) {
        const a = easeOut(clamp((t - p.d) / 0.5))
        const s = cell * (0.4 + 0.6 * a)
        ctx.fillRect(p.sx + (p.x - p.sx) * a, p.sy + (p.y - p.sy) * a, s, s)
      }
    })
    return () => { offFrame(); ro.disconnect() }
  }, [])

  return (
    <Tag id={id} className={`pixel-heading ${className}`}>
      <span ref={text} className="pixel-heading-text">{children}</span>
      <canvas ref={canvas} className="pixel-heading-canvas" aria-hidden="true" />
    </Tag>
  )
})

export default PixelHeading
