import { useEffect, useRef, useState } from 'react'
import './Loader.css'
import { lockScroll } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'

const KEY = 'gg-intro-seen'
const MIN_MS = 1700 // the count never finishes faster than this, so it reads as a moment, not a flash
const FLIGHT_MS = 950

const shouldPlay = () => {
  try { return !reducedMotion() && !sessionStorage.getItem(KEY) } catch { return !reducedMotion() }
}

// Intro: a face-down card counts the real load to 100, then flips and flies
// into the hero as card No.01 while the name rises (the hero waits on html.intro).
export default function Loader() {
  const [play] = useState(shouldPlay)
  const [phase, setPhase] = useState('count') // count -> fly -> gone
  const [pct, setPct] = useState(0)
  const cardRef = useRef(null)
  const xyRef = useRef(null)
  const skip = useRef(false)

  useEffect(() => {
    if (!play) return
    const html = document.documentElement
    html.classList.add('intro', 'intro-dealt', 'intro-hand')
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    lockScroll(true)

    let ready = false
    Promise.all([document.fonts.ready, new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })))])
      .then(() => { ready = true })

    const t0 = performance.now()
    let v = 0, raf = 0
    const tick = (now) => {
      const target = skip.current ? 1 : Math.min((now - t0) / MIN_MS, ready ? 1 : 0.9)
      v += (target - v) * (skip.current ? 0.5 : 0.12)
      if (target === 1 && v > 0.995) v = 1
      setPct(v)
      if (v < 1) raf = requestAnimationFrame(tick)
      else setPhase('fly')
    }
    raf = requestAnimationFrame(tick)

    const onKey = (e) => { if (e.key === 'Escape') skip.current = true }
    const onMove = (e) => { if (xyRef.current) xyRef.current.textContent = `x${String(e.clientX).padStart(4, '0')} y${String(e.clientY).padStart(4, '0')}` }
    addEventListener('keydown', onKey)
    addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); removeEventListener('keydown', onKey); removeEventListener('pointermove', onMove) }
  }, [play])

  useEffect(() => {
    if (phase !== 'fly') return
    const html = document.documentElement
    const card = cardRef.current
    const deck = document.querySelector('.deck')
    // hand-off: hero animations start, card No.01 stays hidden until this card lands on it
    html.classList.remove('intro')
    if (card && deck) {
      const a = card.getBoundingClientRect()
      const b = deck.getBoundingClientRect()
      const dx = b.left + b.width / 2 - (a.left + a.width / 2)
      const dy = b.top + b.height / 2 - (a.top + a.height / 2)
      card.style.transform = `translate(${dx}px, ${dy}px) rotate(-1.5deg) scale(${b.width / a.width})`
    }
    const done = setTimeout(() => {
      html.classList.remove('intro-hand')
      try { sessionStorage.setItem(KEY, '1') } catch { /* private mode: intro just replays */ }
      lockScroll(false)
      setPhase('gone')
    }, FLIGHT_MS)
    return () => clearTimeout(done)
  }, [phase])

  if (!play || phase === 'gone') return null
  const n = Math.round(pct * 100)

  return (
    <div className={`loader is-${phase}`} role="status" aria-label={`Loading, ${n} percent`}>
      <div className="loader-chrome mono caps" aria-hidden="true">
        <span>Gonzalo Gigena</span>
        <span className="loader-mid">Dealing the set · No.01—04</span>
        <span className="loader-coords" ref={xyRef}>x0000 y0000</span>
      </div>

      <div className="loader-stage" aria-hidden="true">
        <div className="loader-ghost" style={{ '--r': `${(1 - pct) * -7}deg`, '--x': `${(1 - pct) * -22}%` }} />
        <div className="loader-ghost" style={{ '--r': `${(1 - pct) * 6}deg`, '--x': `${(1 - pct) * 20}%` }} />
        <div className="loader-card" ref={cardRef}>
          <div className="loader-back">
            <span className="loader-head mono caps"><span>Set</span><span>/100</span></span>
            <span className="loader-count numeral">{String(n).padStart(3, '0')}</span>
            <span className="loader-bar"><span style={{ transform: `scaleX(${pct})` }} /></span>
          </div>
          <div className="loader-front">
            <span className="loader-head mono caps"><span className="loader-live">No.01</span><span>/04</span></span>
            <span className="loader-front-viz" />
            <span className="deck-title">Telemetry Lakehouse</span>
            <span className="deck-meta mono dim">Rust · PostgreSQL · React</span>
          </div>
        </div>
      </div>

      <button className="loader-skip" onClick={() => { skip.current = true }} tabIndex={phase === 'count' ? 0 : -1}>
        Skip intro <kbd className="mono">Esc</kbd>
      </button>
    </div>
  )
}
