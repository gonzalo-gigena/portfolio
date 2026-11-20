import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { reducedMotion } from './useInView.js'

// Weighted smooth scroll (as on the reference sites); native scroll under reduced motion.
export const lenis = reducedMotion() ? null : new Lenis({ lerp: 0.09, anchors: { offset: -60 } })

if (lenis) {
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}

export const lockScroll = (on) => {
  if (lenis) on ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = on ? 'hidden' : ''
}
