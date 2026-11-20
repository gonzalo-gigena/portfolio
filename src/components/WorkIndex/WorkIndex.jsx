import { useEffect, useRef, useState } from 'react'
import './WorkIndex.css'
import Arrow from '../Arrow/Arrow.jsx'
import { onFrame } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { index } from './workIndex.data.js'

const STEPS = [40, 20, 10, 5, 2, 1] // block sizes, coarse → sharp
const RESOLVE_MS = 520
const images = new Map()
const imageOf = (row) => {
  if (!images.has(row.no)) { const img = new Image(); img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(row.art)}`; images.set(row.no, img) }
  return images.get(row.no)
}

// A hairline index of the rest of the work. Hovering (or focusing) a row floats a preview that resolves
// from pixels to sharp.
export default function WorkIndex() {
  const [hover, setHover] = useState(null)
  const box = useRef(null)
  const canvas = useRef(null)
  const state = useRef({ row: null, t0: 0, x: 0, y: 0, tx: 0, ty: 0, step: -1 })

  useEffect(() => { index.forEach(imageOf) }, [])

  useEffect(() => {
    const cv = canvas.current, ctx = cv.getContext('2d')
    const tiny = document.createElement('canvas')
    const tctx = tiny.getContext('2d')
    const still = reducedMotion()
    return onFrame((_, now) => {
      const s = state.current
      if (!s.row) return
      s.x += (s.tx - s.x) * (still ? 1 : 0.18)
      s.y += (s.ty - s.y) * (still ? 1 : 0.18)
      box.current.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`
      const img = imageOf(s.row)
      if (!img.complete) return
      const step = still ? STEPS.length - 1 : Math.min(STEPS.length - 1, Math.floor(((now - s.t0) / RESOLVE_MS) * STEPS.length))
      if (step === s.step) return
      s.step = step
      const b = STEPS[step], W = cv.width, H = cv.height
      ctx.imageSmoothingEnabled = false
      if (b === 1) { ctx.drawImage(img, 0, 0, W, H); return }
      tiny.width = Math.ceil(W / b); tiny.height = Math.ceil(H / b)
      tctx.drawImage(img, 0, 0, tiny.width, tiny.height)
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(tiny, 0, 0, tiny.width, tiny.height, 0, 0, W, H)
    })
  }, [])

  const show = (row, x, y) => {
    const s = state.current
    if (s.row !== row) { s.row = row; s.t0 = performance.now(); s.step = -1 }
    s.tx = x; s.ty = y
    if (!hover || hover !== row.no) { s.x = x; s.y = y }
    setHover(row.no)
  }
  const hide = () => { state.current.row = null; setHover(null) }

  return (
    <div className="windex grid">
      <div className="label-col">
        <h3 className="label-name"><span className="mono dim" aria-hidden="true">(02.2)</span>Index</h3>
        <p>Public repositories, thesis included. Everything here is on GitHub.</p>
      </div>
      <ul className="windex-list content-col" onPointerLeave={hide}>
        {index.map((r) => (
          <li key={r.no} data-tags={r.tags.join('|')}>
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="windex-row"
              onPointerMove={(e) => show(r, e.clientX + 24, e.clientY - 110)}
              onFocus={(e) => { const b = e.currentTarget.getBoundingClientRect(); show(r, b.right - 340, b.top - 60) }}
              onBlur={hide}
            >
              <span className="mono dim">{r.no}</span>
              <span className="windex-name">{r.name}</span>
              <span className="windex-line">{r.line}</span>
              <span className="mono dim windex-stack">{r.stack}</span>
              <span className="mono windex-year">{r.year}<Arrow /></span>
            </a>
          </li>
        ))}
      </ul>
      <div ref={box} className={`windex-preview ${hover ? 'is-on' : ''}`} aria-hidden="true">
        <canvas ref={canvas} width="640" height="400" />
        <span className="windex-tag mono">Illustration</span>
      </div>
    </div>
  )
}
