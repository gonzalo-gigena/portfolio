import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { reducedMotion } from './useInView.js'

// Weighted smooth scroll; native scroll under reduced motion and on touch screens (Lenis doesn't smooth touch anyway).
export const lenis = reducedMotion() || matchMedia('(pointer: coarse)').matches ? null : new Lenis({ lerp: 0.1 })
if (import.meta.env.DEV) {
  // dev-only: scripted scroll checks (?y=1234 jumps there after load)
  window.__lenis = lenis
  const y = +new URLSearchParams(location.search).get('y')
  if (y) setTimeout(() => { scrollTo(0, y); lenis?.scrollTo(y, { immediate: true, force: true }) }, 800)
}

// ponytail: the page's only requestAnimationFrame loop; everything that moves subscribes here.
const subs = new Set()
export const onFrame = (fn) => { subs.add(fn); return () => subs.delete(fn) }
const loop = (t) => {
  lenis?.raf(t)
  const y = window.scrollY
  for (const fn of subs) fn(y, t)
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

export function useFrame(fn) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => onFrame((y, t) => ref.current(y, t)), [])
}

// absolute top/height of an element, re-measured whenever the document resizes (never per frame)
export function useMeasure(elRef, after) {
  const m = useRef({ top: 0, height: 0 })
  useEffect(() => {
    const update = () => {
      const el = elRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      m.current = { top: r.top + window.scrollY, height: r.height }
      after?.(m.current)
    }
    update()
    document.fonts?.ready.then(update)
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    addEventListener('resize', update)
    return () => { ro.disconnect(); removeEventListener('resize', update) }
  }, [])
  return m
}

// in-page navigation that also moves focus (sections carry tabIndex=-1)
export function go(e, id) {
  const el = document.getElementById(id)
  if (!el) return
  e?.preventDefault()
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView()
  el.focus({ preventScroll: true })
  history.replaceState(null, '', `#${id}`)
}

export const lockScroll = (on) => (lenis ? (on ? lenis.stop() : lenis.start()) : null)
