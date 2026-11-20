import { useRef } from 'react'
import './Intro.css'
import { useFrame, useMeasure } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { clamp } from '../../pixel.js'
import { statement, paragraphs, marquee } from './intro.data.js'

const WORDS = statement.split(' ')

// 01 — the positioning statement, revealed word by word by the scroll position (not by time).
export default function Intro() {
  const ref = useRef(null)
  const m = useMeasure(ref)
  const last = useRef(-1)
  const still = reducedMotion()

  useFrame((y) => {
    if (still) return
    const vh = innerHeight
    const top = m.current.top - y
    if (top > vh || top + m.current.height < 0) return
    const p = clamp((vh * 0.82 - top) / (m.current.height + vh * 0.2))
    if (p === last.current) return
    last.current = p
    const n = WORDS.length
    ;[...ref.current.children].forEach((w, i) => { w.style.opacity = 0.15 + 0.85 * clamp(p * n * 1.15 - i) })
  })

  return (
    <section id="intro" className="intro section" tabIndex={-1} aria-labelledby="intro-label">
      <div className="grid">
        <div className="label-col">
          <h2 id="intro-label"><span className="mono dim" aria-hidden="true">(01)</span>Introduction</h2>
        </div>
        <p className="intro-statement content-col" ref={ref}>
          {WORDS.map((w, i) => <span key={i} className="intro-word">{w} </span>)}
        </p>
        <div className="intro-paras">
          {paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-run">
          {Array.from({ length: 6 }, (_, i) => <span key={i}>{marquee}</span>)}
        </div>
      </div>
    </section>
  )
}
