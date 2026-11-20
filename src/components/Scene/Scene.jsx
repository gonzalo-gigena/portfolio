import { useEffect, useRef, useState } from 'react'
import './Scene.css'
import { onFrame, useMeasure } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { clamp, easeOut } from '../../pixel.js'

const W = 0.07 // half-width of a layer handover, in scene progress

// offset of el's centre inside `root`, ignoring transforms (offsetLeft/Top chain)
function centreIn(el, root) {
  let x = el.offsetWidth / 2, y = el.offsetHeight / 2
  while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent }
  return [x, y]
}

// shrink a layer's content to fit the viewport (phones: the diagrams are taller than the screen).
// Returns the zoom origin for the next layer, corrected for that shrink.
function fit(el, stage) {
  const c = el.firstElementChild
  c.style.transform = ''
  const cs = getComputedStyle(el)
  const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
  const f = Math.min(1, h / c.offsetHeight)
  if (f < 1) c.style.transform = `scale(${f.toFixed(4)})`
  const z = el.querySelector('[data-zoom]')
  if (!z) return '50% 50%'
  const [zx, zy] = centreIn(z, stage), [cx, cy] = centreIn(c, stage)
  return `${cx + (zx - cx) * f}px ${cy + (zy - cy) * f}px`
}

// A full-screen project scene. On desktop it pins and scroll scrubs a camera push through its layers:
// each layer grows out of a node of the one before it. Under reduced motion the layers
// stack in normal flow, all visible. `bounds` splits progress between layers.
export default function Scene({ id, meta, layers, bounds, onProgress, length = 400, note }) {
  const root = useRef(null)
  const stage = useRef(null)
  const layerEls = useRef([])
  const origins = useRef([])
  const [stacked, setStacked] = useState(reducedMotion)
  const [current, setCurrent] = useState(0)
  const last = useRef(-1)
  const vh = useRef(1)
  const refit = () => {
    vh.current = stage.current.offsetHeight
    if (reducedMotion()) return
    origins.current = layerEls.current.map((el) => (el ? fit(el, stage.current) : '50% 50%'))
    last.current = -1
  }
  const m = useMeasure(root, refit)

  // layer content can change size after mount (fonts, the bridge going vertical); refit when it does
  useEffect(() => {
    const ro = new ResizeObserver(refit)
    layerEls.current.forEach((el) => el && ro.observe(el.firstElementChild))
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setStacked(mq.matches)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  const apply = (p) => {
    const L = layers.length
    layerEls.current.forEach((el, i) => {
      if (!el) return
      const enter = i === 0 ? 1 : clamp((p - (bounds[i] - W)) / (2 * W))
      const exit = i === L - 1 ? 0 : clamp((p - (bounds[i + 1] - W)) / (2 * W))
      const scale = Math.exp(Math.log(0.22) * (1 - easeOut(enter))) * Math.exp(Math.log(9) * exit * exit)
      const opacity = clamp(enter * 1.5 - 0.5) * clamp(1 - exit * 1.6)
      el.style.transformOrigin = exit > 0 ? origins.current[i] : origins.current[i - 1] ?? '50% 50%'
      el.style.transform = `scale(${scale.toFixed(4)})`
      el.style.opacity = opacity.toFixed(3)
      el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
    })
    let c = 0
    for (let i = 1; i < L; i++) if (p >= bounds[i]) c = i
    setCurrent(c)
    onProgress?.(p)
  }

  // desktop: scroll drives progress
  useEffect(() => {
    if (stacked) return
    last.current = -1
    return onFrame((y) => {
      const { top, height } = m.current
      // the pinned stage's own height, not innerHeight: on phones innerHeight changes every frame
      // while the address bar collapses, which made the progress (and the zoom) shake
      if (y + vh.current < top - 200 || y > top + height + 200) return
      const p = clamp((y - top) / (height - vh.current))
      if (p === last.current) return
      last.current = p
      apply(p)
    })
  }, [stacked])

  // stacked: every layer shown as-is, scene treated as fully played
  useEffect(() => {
    if (!stacked) return
    layerEls.current.forEach((el) => { if (el) el.style.cssText = el.firstElementChild.style.transform = '' })
    onProgress?.(1)
  }, [stacked])

  const n = layers.length
  return (
    <article
      id={id}
      ref={root}
      className={`scene ${stacked ? 'scene--stacked' : ''}`}
      style={{ '--len': `${length}vh` }}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
    >
      <div className="scene-stage" ref={stage}>
        {layers.map((l, i) => (
          <div key={l.name} ref={(el) => (layerEls.current[i] = el)} className="scene-layer">
            {l.node}
          </div>
        ))}

        <p className="scene-meta mono">{meta}</p>
        {!stacked && (
          <p className="scene-readout mono" aria-live="polite">
            Layer {current + 1} / {n} · {layers[current].name}
          </p>
        )}
        {note && <p className="scene-note mono">{note}</p>}
      </div>
    </article>
  )
}

// Layer 1 of every scene: the oversized title and the one-line brief.
export function SceneTitle({ id, title, line }) {
  return (
    <div className="scene-title" data-zoom>
      <h3 id={`${id}-title`} className="scene-h display">
        {title.map((t) => <span key={t}>{t}</span>)}
      </h3>
      <p className="scene-line">{line}</p>
    </div>
  )
}
