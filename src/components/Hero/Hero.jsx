import { useEffect, useRef, useState } from 'react'
import './Hero.css'
import { links } from '../../links.js'
import { projects } from '../Series/series.data.js'
import Pipeline from '../Pipeline/Pipeline.jsx'
import Bridge from '../Bridge/Bridge.jsx'
import Satellite from '../Satellite/Satellite.jsx'
import { reducedMotion } from '../../useInView.js'
import Arrow from '../Arrow/Arrow.jsx'

const VIZ = { pipeline: Pipeline, bridge: Bridge, satellite: Satellite }
const NAME = ['GONZALO', 'GIGENA']

function useClock() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Cordoba' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => { const i = setInterval(() => setT(fmt()), 15000); return () => clearInterval(i) }, [])
  return t
}

export default function Hero() {
  const deckRef = useRef(null)
  const markRef = useRef(null)
  const xyRef = useRef(null)
  const time = useClock()

  // size the name so it spans the page edge to edge, on one line or stacked
  useEffect(() => {
    const el = markRef.current
    const fit = () => {
      const words = [...el.children]
      const cs = getComputedStyle(el)
      const stacked = cs.flexDirection === 'column'
      const fs = parseFloat(cs.fontSize)
      const natural = stacked
        ? Math.max(...words.map((w) => w.scrollWidth))
        : words.reduce((a, w) => a + w.scrollWidth, 0) + parseFloat(cs.columnGap || 0) * (words.length - 1)
      el.style.fontSize = `${(fs * el.clientWidth) / natural}px`
    }
    document.fonts.ready.then(fit)
    addEventListener('resize', fit)
    return () => removeEventListener('resize', fit)
  }, [])

  // pointer tilts the deck; one rAF write of two CSS vars
  useEffect(() => {
    if (reducedMotion() || matchMedia('(pointer: coarse)').matches) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5
        deckRef.current?.style.setProperty('--tx', x.toFixed(3))
        deckRef.current?.style.setProperty('--ty', y.toFixed(3))
        if (xyRef.current) xyRef.current.textContent = ` · x${String(e.clientX).padStart(4, '0')} y${String(e.clientY).padStart(4, '0')}`
      })
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="hero-top page">
        <p className="hero-statement">
          <strong>Full-stack software engineer.</strong> I build reliable software systems, connect complex services, and turn complicated technical problems into practical solutions.
        </p>
        <div className="hero-actions">
          <a className="btn-live" href="#contact">
            Get in touch
            <Arrow />
          </a>
          <a className="hero-sec link-u" href="#work">See the work</a>
        </div>
      </div>

      <div className="deck" ref={deckRef} aria-label="Selected projects">
        {projects.map((p, i) => {
          const Viz = VIZ[p.viz]
          return (
            <a key={p.id} href={`#${p.id}`} className={`deck-card stock deck-card--${i}`} style={{ '--i': i }} aria-label={`No.${p.no}: ${p.title}`}>
              <span className="deck-head mono caps">
                <span className={i === 0 ? 'deck-live' : ''}>No.{p.no}</span>
                <span className="dim">/04</span>
              </span>
              <span className="deck-viz" aria-hidden="true"><Viz compact /></span>
              <span className="deck-title">{p.title}</span>
              <span className="deck-meta mono dim">{p.stack.slice(0, 3).join(' · ')}</span>
            </a>
          )
        })}
      </div>

      <div className="hero-bottom page">
        <div className="hero-meta mono caps">
          <span>Córdoba, AR <span className="dim">· {time} ART · remote</span><span className="dim hero-xy" ref={xyRef} aria-hidden="true"> · x0000 y0000</span></span>
          <span className="hero-links label">
            <a className="link-u" href={links.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
            <a className="link-u" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
          </span>
        </div>
        <h1 id="hero-name" ref={markRef} className="wordmark" aria-label="Gonzalo Gigena">
          {NAME.map((word, w) => (
            <span key={word} className="wordmark-word" aria-hidden="true">
              {[...word].map((ch, c) => (
                <span key={c} className="wordmark-ch" style={{ '--d': `${(w * 7 + c) * 35}ms` }}>{ch}</span>
              ))}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
