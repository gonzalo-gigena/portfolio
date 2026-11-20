import { useEffect, useRef, useState } from 'react'
import './Scene.css'
import Arrow from '../Arrow/Arrow.jsx'
import { onFrame, useMeasure } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { clamp, easeOut } from '../../pixel.js'

const W = 0.07 // half-width of a layer handover, in scene progress

// offset of el's centre inside `root`, ignoring transforms (offsetLeft/Top chain)
function centreIn(el, root) {
  let x = el.offsetWidth / 2, y = el.offsetHeight / 2
  while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent }
  return `${x}px ${y}px`
}

// A full-screen project scene. On desktop it pins and scroll scrubs a camera push through its layers:
// each layer grows out of a node of the one before it. On phones and under reduced motion the layers
// become a stacked scene you tap through. `bounds` splits progress between layers.
export default function Scene({ id, meta, layers, bounds, taps, onProgress, length = 400, note }) {
  const root = useRef(null)
  const stage = useRef(null)
  const layerEls = useRef([])
  const origins = useRef([])
  const [stacked, setStacked] = useState(false)
  const [tap, setTap] = useState(0)
  const [current, setCurrent] = useState(0)
  const last = useRef(-1)
  const m = useMeasure(root, () => {
    origins.current = layerEls.current.map((el) => {
      const z = el?.querySelector('[data-zoom]')
      return z ? centreIn(z, stage.current) : '50% 50%'
    })
    last.current = -1
  })

  useEffect(() => {
    const mq = matchMedia('(max-width: 760px)')
    const f = () => setStacked(mq.matches || reducedMotion())
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
      if (y + innerHeight < top - 200 || y > top + height + 200) return
      const p = clamp((y - top) / (height - innerHeight))
      if (p === last.current) return
      last.current = p
      apply(p)
    })
  }, [stacked])

  // stacked: taps drive progress
  useEffect(() => { if (stacked) apply(taps[tap]) }, [stacked, tap])

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
          <div key={l.name} ref={(el) => (layerEls.current[i] = el)} className="scene-layer" aria-hidden={stacked ? current !== i : undefined}>
            {l.node}
          </div>
        ))}

        <p className="scene-meta mono">{meta}</p>
        <p className="scene-readout mono" aria-live="polite">
          Layer {current + 1} / {n} · {layers[current].name}
        </p>
        {note && <p className="scene-note mono">{note}</p>}
        {stacked && (
          <button type="button" className="scene-next mono" onClick={() => setTap((t) => (t + 1) % taps.length)}>
            {tap === taps.length - 1 ? 'Start over' : 'Next layer'}<Arrow dir="e" />
          </button>
        )}
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
