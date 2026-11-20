import { useEffect, useState } from 'react'
import './Bridge.css'
import Scene, { SceneTitle } from '../Scene/Scene.jsx'
import useInView from '../../useInView.js'
import { bridge as p, validators, boxes, states } from './bridge.data.js'
import { clamp } from '../../pixel.js'

const BOUNDS = [0, 0.2, 1]
const TAPS = [0.08, 0.36, 0.64, 0.92]
const ORDER = ['healthy', 'degraded', 'recovered']

function Topology({ state, vertical }) {
  const [ref, inView] = useInView('0px')
  useEffect(() => { const svg = ref.current; if (svg) inView && state !== 'degraded' ? svg.unpauseAnimations() : svg.pauseAnimations() }, [inView, state])
  const T = ([x, y]) => (vertical ? [y, x] : [x, y])
  const vb = vertical ? '0 0 560 1000' : '0 0 1000 560'
  const hub = T([500, 300])
  const lane = vertical ? 'M300 175 V825' : 'M175 300 H825'
  const deg = state === 'degraded'

  return (
    <svg ref={ref} viewBox={vb} className={`topo topo--${state} ${vertical ? 'topo--v' : ''}`} role="img" aria-label={`Illustrated bridge topology, state ${states[state].label}: chain A to chain B through bridge contracts, seven validators, SLA monitor and alerting.`}>
      <text {...xy(T([500, 64]), vertical && [20, 300])} className="topo-cap" textAnchor={vertical ? 'start' : 'middle'}>Validator set</text>
      {validators.map((v) => <line key={v.id} {...line(T(v.c), hub)} className={`topo-att ${deg && v.weak ? 'is-weak' : ''}`} />)}
      <path d={lane} className="topo-lane" />
      <line {...line(hub, edge(box('sla'), hub, T, vertical))} className="topo-dash" />
      <line {...line(edge(box('sla'), T(box('alert').c), T, vertical), edge(box('alert'), T(box('sla').c), T, vertical))} className="topo-dash" />

      {/* packets drawn before the boxes: the opaque boxes hide them, so they only show on the wires */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="-4" y="-4" width="8" height="8" className="topo-pkt">
          <animateMotion dur="3s" begin={`${i}s`} repeatCount="indefinite" path={lane} />
        </rect>
      ))}
      {boxes.map((b) => {
        const [cx, cy] = T(b.c)
        const [w, h] = vertical && b.flow ? [b.h, b.w] : [b.w, b.h]
        const s = b.status ? states[state][b.id] : b.sub
        return (
          <g key={b.id} className={`topo-box ${b.status && deg ? 'is-alarm' : ''}`}>
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" />
            <text x={cx - w / 2 + 14} y={cy - (b.flow ? h / 2 - 28 : 4)} className="topo-label">{b.label}</text>
            <text x={cx - w / 2 + 14} y={cy + (b.flow ? -h / 2 + 48 : 18)} className="topo-sub">{s}</text>
            {b.flow && [0, 1, 2].map((i) => <rect key={i} x={cx - 14 + (vertical ? (i - 1) * 34 : 0)} y={cy - 2 + (vertical ? 0 : i * 30) + (vertical ? 10 : 0)} width="28" height="20" rx="3" className="topo-block" />)}
          </g>
        )
      })}

      <text {...xy(T([512, 338]), vertical && [312, 560])} className="topo-cap">Relayers</text>
      {deg && [0, 1, 2].map((i) => <rect key={i} {...queue(hub, i, vertical)} width="8" height="8" className="topo-queue" />)}

      {validators.map((v) => {
        const [cx, cy] = T(v.c)
        const weak = deg && v.weak
        return (
          <g key={v.id} className={`topo-v ${weak ? 'is-weak' : ''}`}>
            <circle cx={cx} cy={cy} r="13" />
            {!weak && <circle cx={cx} cy={cy} r="4" className="topo-ok" />}
            <text x={cx} y={cy - 22} textAnchor="middle" className="topo-sub">{v.id}</text>
          </g>
        )
      })}
    </svg>
  )
}
const box = (id) => boxes.find((b) => b.id === id)
// point on box b's edge facing `to` (screen space; box dims are not transposed)
function edge(b, [tx, ty], T) {
  const [cx, cy] = T(b.c)
  const dx = tx - cx, dy = ty - cy
  return Math.abs(dx) / b.w > Math.abs(dy) / b.h ? [cx + Math.sign(dx) * b.w / 2, cy] : [cx, cy + Math.sign(dy) * b.h / 2]
}
const xy = ([x, y], o) => ({ x: o ? o[0] : x, y: o ? o[1] : y })
const line = ([x1, y1], [x2, y2]) => ({ x1, y1, x2, y2 })
const queue = ([x, y], i, v) => (v ? { x: x - 4, y: y - 30 - i * 12 } : { x: x - 30 - i * 12, y: y - 4 })

// Project 02: title → topology whose health changes with scroll (healthy → degraded → recovered).
export default function Bridge() {
  const [state, setState] = useState('healthy')
  const [vertical, setVertical] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(max-width: 760px)')
    const f = () => setVertical(mq.matches)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  const onProgress = (pr) => {
    const local = clamp((pr - BOUNDS[1]) / (1 - BOUNDS[1]))
    setState(local < 0.4 ? 'healthy' : local < 0.7 ? 'degraded' : 'recovered')
  }

  const layers = [
    { name: 'Title', node: <SceneTitle id={p.id} title={p.title} line={p.line} /> },
    {
      name: 'Topology',
      node: (
        <div className="br-diagram">
          <div className="br-head mono">
            <span>Fig. 03 — Bridge topology</span>
            <ol className="br-states" aria-label="Health state">
              {ORDER.map((s) => (
                <li key={s} className={s === state ? 'is-on' : ''} aria-current={s === state ? 'step' : undefined}>
                  {s === state && <i className={s === 'degraded' ? 'is-hollow' : ''} aria-hidden="true" />}
                  {states[s].label}
                </li>
              ))}
            </ol>
          </div>
          <Topology state={state} vertical={vertical} />
        </div>
      ),
    },
  ]

  return <Scene id={p.id} meta={p.meta} note={p.note} layers={layers} bounds={BOUNDS} taps={TAPS} onProgress={onProgress} length={380} />
}
