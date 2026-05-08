import { useEffect, useRef, useState } from 'react'

export function useReveal(opts = {}) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!ref.current || seen) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect() }
      })
    }, { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px 0px -8% 0px" })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

export function Reveal({ children, className = "", as: Tag = "div", tilt = false, stagger = false, ...rest }) {
  const [ref, seen] = useReveal()
  const cls = [
    tilt ? "reveal-tilt" : "reveal",
    stagger ? "stagger" : "",
    seen ? "in" : "",
    className,
  ].filter(Boolean).join(" ")
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>
}
