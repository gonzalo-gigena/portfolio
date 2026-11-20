import './Deco.css'
import { decoSets } from './deco.data.js'

const paths = {
  star: { viewBox: '0 0 32 32', d: 'M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z', stroke: true },
  blob: { viewBox: '0 0 80 80', d: 'M40 5 C55 5,75 20,75 40 C75 60,60 75,40 75 C20 75,5 60,5 40 C5 20,25 5,40 5Z' },
}

export default function Deco({ set }) {
  return decoSets[set].map(({ shape, fill, size, rotate, spin, ...pos }, i) => {
    const p = paths[shape]
    return (
      <svg key={i} className={`deco${spin ? ' spin' : ''}`} aria-hidden="true"
        width={size} height={size} viewBox={p.viewBox} style={{ ...pos, rotate: `${rotate}deg` }}>
        <path d={p.d} fill={fill} {...(p.stroke && { stroke: '#111', strokeWidth: 1.5 })} />
      </svg>
    )
  })
}
