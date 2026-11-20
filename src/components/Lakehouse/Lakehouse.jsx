import { useState } from 'react'
import './Lakehouse.css'
import Scene, { SceneTitle } from '../Scene/Scene.jsx'
import Pipeline from '../Pipeline/Pipeline.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'
import { lakehouse as p } from './lakehouse.data.js'
import { clamp } from '../../pixel.js'

const BOUNDS = [0, 0.2, 0.68, 1]

// Project 01: title → pipeline (stages light up as you scroll) → push through the dashboard node.
export default function Lakehouse() {
  const [active, setActive] = useState(0)
  const onProgress = (pr) => setActive(Math.min(5, Math.floor(clamp((pr - BOUNDS[1]) / (BOUNDS[2] - BOUNDS[1])) * 7)))

  const layers = [
    { name: 'Title', node: <SceneTitle id={p.id} title={p.title} line={p.line} /> },
    {
      name: 'Pipeline',
      node: (
        <div className="lh-diagram">
          <p className="lh-fig mono"><span>Fig. 02 — Telemetry pipeline</span><span className="dim">{active} / 5 stages live</span></p>
          <Pipeline active={active} />
          <p className="lh-cap">{p.caption}</p>
        </div>
      ),
    },
    { name: 'Dashboard', node: <Dashboard /> },
  ]

  return <Scene id={p.id} meta={p.meta} note={p.note} layers={layers} bounds={BOUNDS} onProgress={onProgress} length={460} />
}
