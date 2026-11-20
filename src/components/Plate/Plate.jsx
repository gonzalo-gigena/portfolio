import { useEffect, useRef } from 'react'
import './Plate.css'
import Pipeline from '../Pipeline/Pipeline.jsx'
import Arrow from '../Arrow/Arrow.jsx'
import { go, useFrame } from '../../scroll.js'
import { reducedMotion } from '../../useInView.js'

// The hero's one physical object: a paper plate carrying the live pipeline schematic.
// Pointer tilts it in 3D; the shadow answers the tilt.
export default function Plate() {
  const ref = useRef(null)
  const aim = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion() || matchMedia('(pointer: coarse)').matches) return
    const move = (e) => { aim.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 } }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [])

  useFrame((y) => {
    if (y > innerHeight) return
    const a = aim.current, c = cur.current
    const dx = a.x - c.x, dy = a.y - c.y
    if (Math.abs(dx) + Math.abs(dy) < 0.0005) return
    c.x += dx * 0.08; c.y += dy * 0.08
    ref.current.style.setProperty('--px', c.x.toFixed(4))
    ref.current.style.setProperty('--py', c.y.toFixed(4))
  })

  return (
    <a
      ref={ref}
      href="#lakehouse"
      onClick={(e) => go(e, 'lakehouse')}
      className="plate"
      aria-label="Telemetry pipeline schematic. Go to project 01, Telemetry Lakehouse."
    >
      <span className="plate-body">
        <span className="plate-head mono">
          <span>Fig. 01</span>
          <span className="dim">Telemetry pipeline</span>
          <span className="plate-state"><i aria-hidden="true" />Schematic</span>
        </span>
        <Pipeline compact />
        <span className="plate-io mono dim">
          <span>CI artifacts · tests · coverage · metrics</span>
          <span><Arrow dir="e" size={9} /> dashboards</span>
        </span>
        <span className="plate-foot">
          <span>Project 01 — Telemetry Lakehouse</span>
          <Arrow dir="s" />
        </span>
      </span>
    </a>
  )
}
