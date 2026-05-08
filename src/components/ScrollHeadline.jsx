import { useEffect, useRef } from 'react'

export function ScrollHeadline({ children, direction = -1, speed = 0.6 }) {
  const ref = useRef(null)
  const trackRef = useRef(null)
  useEffect(() => {
    let raf
    const tick = () => {
      if (ref.current && trackRef.current) {
        const r = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = (r.top + r.height / 2 - vh / 2) / vh
        const offset = progress * 800 * speed * direction
        trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [direction, speed])

  return (
    <div className="scroll-headline" ref={ref}>
      <div className="scroll-headline-track" ref={trackRef}>
        {children}
      </div>
    </div>
  )
}
