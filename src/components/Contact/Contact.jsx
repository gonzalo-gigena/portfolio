import { useEffect, useRef, useState } from 'react'
import './Contact.css'
import Bitmap, { Monogram } from '../Bitmap/Bitmap.jsx'
import Arrow from '../Arrow/Arrow.jsx'
import { useFrame } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'
import { front, back } from './contact.data.js'

// 06 — the identity as one object: a business card. Pointer tilt, a faint sheen, flip to the contact table.
// The back stays in the accessibility tree; focusing anything on it turns the card over.
export default function Contact() {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const card = useRef(null)
  const aim = useRef({ x: 0, y: 0, on: false })
  const cur = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion() || matchMedia('(pointer: coarse)').matches) return
    const el = card.current.parentElement
    const move = (e) => { const r = el.getBoundingClientRect(); aim.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5, on: true } }
    const leave = () => { aim.current = { x: 0, y: 0, on: false } }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])

  useFrame(() => {
    const a = aim.current, c = cur.current
    const dx = a.x - c.x, dy = a.y - c.y
    if (Math.abs(dx) + Math.abs(dy) < 0.0005) return
    c.x += dx * 0.1; c.y += dy * 0.1
    card.current.style.setProperty('--cx', c.x.toFixed(4))
    card.current.style.setProperty('--cy', c.y.toFixed(4))
  })

  const copy = async () => {
    try { await navigator.clipboard.writeText(back.rows[0].v); setCopied(true); setTimeout(() => setCopied(false), 2400) }
    catch { location.href = `mailto:${back.rows[0].v}` }
  }

  return (
    <section id="contact" className="contact section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="grid">
        <div className="label-col">
          <h2 id="contact-title"><span className="mono dim" aria-hidden="true">(06)</span>Contact</h2>
        </div>
      </div>

      <div className="card-scene">
        <div ref={card} className={`card ${flipped ? 'is-flipped' : ''}`} onClick={(e) => { if (!e.target.closest('a, button')) setFlipped(!flipped) }}>
          <div className="card-face card-front" aria-hidden={flipped}>
            <span className="card-place mono">{front.place}</span>
            <Bitmap lines={front.name} className="card-name" label="Gonzalo Gigena" />
            <span className="card-line mono">{front.line}</span>
            <Monogram className="card-mono" />
            <span className="card-sheen" aria-hidden="true" />
          </div>
          <div className="card-face card-back" onFocus={() => setFlipped(true)}>
            <p className="card-q">{back.line}</p>
            <dl className="card-kv">
              {back.rows.map((r) => (
                <div key={r.k} className="card-row">
                  <dt className="mono">{r.k}</dt>
                  <dd>
                    {r.copy ? (
                      <button type="button" className="card-copy" onClick={copy} aria-describedby="copy-state">{r.v}</button>
                    ) : r.href ? (
                      <a className="link" href={r.href} target="_blank" rel="noreferrer">{r.v}<Arrow /></a>
                    ) : (
                      <span className="card-placeholder">{r.v}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="card-controls">
          <button type="button" className="card-flip mono" aria-pressed={flipped} onClick={() => setFlipped(!flipped)}>
            Tap to flip <Arrow dir="flip" />
          </button>
          <span id="copy-state" className="card-copied mono" aria-live="polite">{copied ? 'Email copied to clipboard' : 'The email copies to your clipboard'}</span>
        </div>
      </div>
    </section>
  )
}
