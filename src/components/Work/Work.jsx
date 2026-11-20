import { useRef } from 'react'
import './Work.css'
import Wipe from '../Wipe/Wipe.jsx'
import PixelHeading from '../PixelHeading/PixelHeading.jsx'
import Lakehouse from '../Lakehouse/Lakehouse.jsx'
import Bridge from '../Bridge/Bridge.jsx'
import WorkIndex from '../WorkIndex/WorkIndex.jsx'
import { clamp } from '../../pixel.js'

// 02 — light → black (monogram wipe), two pinned scenes, the index, black → light (chevron wipe).
export default function Work() {
  const heading = useRef(null)
  const sub = useRef(null)
  const onIn = (p) => {
    heading.current?.set(clamp((p - 0.62) / 0.3))
    if (sub.current) sub.current.style.opacity = clamp((p - 0.88) / 0.1)
  }

  return (
    <section id="work" className="work dark" tabIndex={-1} aria-labelledby="work-title">
      <Wipe shape="monogram" from="--canvas" to="--black" onProgress={onIn}>
        <PixelHeading ref={heading} id="work-title" className="work-title display" auto={false}>Selected work</PixelHeading>
        <p ref={sub} className="work-sub mono">(02) · Two systems in depth, then the index</p>
      </Wipe>
      <Lakehouse />
      <Bridge />
      <WorkIndex />
      <Wipe shape="chevron" from="--black" to="--canvas" className="wipe--out" />
    </section>
  )
}
