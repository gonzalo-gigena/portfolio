import { useEffect, useRef, useState } from 'react'
import './Hud.css'
import { sections } from '../../links.js'
import { go, useFrame } from '../../scroll.js'
import Odometer from '../Odometer/Odometer.jsx'
import { Monogram } from '../Bitmap/Bitmap.jsx'
import { navIds, role, place } from './hud.data.js'

const pad = (n, w = 2) => String(n).padStart(w, '0')
const clock = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: place.zone })
const label = (id) => sections.find((s) => s.id === id).label

// Persistent instrument chrome: clock, cursor, index, progress, skip link, bottom bar, monogram.
export default function Hud() {
  const [time, setTime] = useState(() => clock.format(new Date()))
  const [active, setActive] = useState(0)
  const xy = useRef(null)
  const pct = useRef(null)
  const pointer = useRef({ x: 0, y: 0, dirty: true })
  const lastPct = useRef(-1)

  useEffect(() => {
    const i = setInterval(() => setTime(clock.format(new Date())), 1000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    // whichever section crosses the middle of the viewport is current
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(sections.findIndex((s) => s.id === e.target.id))
    }, { rootMargin: '-50% 0px -50% 0px' })
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    const move = (e) => { pointer.current = { x: e.clientX, y: e.clientY, dirty: true } }
    addEventListener('pointermove', move, { passive: true })
    return () => { io.disconnect(); removeEventListener('pointermove', move) }
  }, [])

  // text writes only; one per frame and only when the value changed
  useFrame((y) => {
    const p = pointer.current
    if (p.dirty && xy.current) { xy.current.textContent = `X ${pad(Math.round(p.x), 4)} Y ${pad(Math.round(p.y), 4)}`; p.dirty = false }
    const max = document.documentElement.scrollHeight - innerHeight
    const v = max > 0 ? Math.round((y / max) * 100) : 0
    if (v !== lastPct.current && pct.current) { pct.current.textContent = `${pad(v, 3)}%`; lastPct.current = v }
  })

  const current = sections[active]?.id

  return (
    <>
      <a className="skip mono" href="#work" onClick={(e) => go(e, 'work')}>Skip to work</a>
      <div className="hud hud-top mono" aria-hidden="true">
        <span className="hud-clock">{place.city}, {time} ({place.offset})</span>
        <span className="hud-right">
          <span className="hud-xy" ref={xy}>X 0000 Y 0000</span>
          <span className="hud-index"><Odometer value={pad(active)} /> / {pad(sections.length - 1)}</span>
          <span className="hud-pct" ref={pct}>000%</span>
        </span>
      </div>

      <header className="hud hud-bar">
        <a className="hud-name" href="#top" onClick={(e) => go(e, 'top')}>
          <strong>Gonzalo Gigena</strong> — {role}
        </a>
        <nav aria-label="Sections">
          <ul className="hud-nav">
            {navIds.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => go(e, id)} className={current === id ? 'is-current' : ''} aria-current={current === id ? 'true' : undefined}>
                  {label(id)}
                </a>
                {i < navIds.length - 1 && <span className="hud-comma" aria-hidden="true">,</span>}
              </li>
            ))}
          </ul>
        </nav>
        <span className="hud-end">
          <a href="#contact" onClick={(e) => go(e, 'contact')} className={current === 'contact' ? 'is-current' : ''} aria-current={current === 'contact' ? 'true' : undefined}>Contact</a>
          <a href="#top" onClick={(e) => go(e, 'top')} className="hud-mono" aria-label="Back to top"><Monogram /></a>
        </span>
      </header>
    </>
  )
}
