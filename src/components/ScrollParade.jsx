import { useEffect, useRef } from 'react'

export function ScrollParade({ direction = 1, items, speed = 0.4 }) {
  const ref = useRef(null)
  const trackRef = useRef(null)
  useEffect(() => {
    let raf
    const tick = () => {
      if (ref.current && trackRef.current) {
        const r = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = (r.top + r.height / 2 - vh / 2) / vh
        const offset = progress * 600 * speed * direction
        trackRef.current.style.transform = `translate3d(${-offset}px, -50%, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [direction, speed])

  const seg = (k) => <span className="seg" key={k}>{items}</span>

  return (
    <div className="parade" ref={ref}>
      <div className="parade-track" ref={trackRef}>
        {[0,1,2,3,4,5,6,7].map(seg)}
      </div>
    </div>
  )
}
