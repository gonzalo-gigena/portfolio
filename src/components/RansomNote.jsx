import { useEffect, useRef, useState, useMemo } from 'react'

function useReveal(opts = {}) {
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

export function RansomNote({ text, seed = 0, animate = false }) {
  const [ref, seen] = useReveal({ threshold: 0.3 })
  const chars = useMemo(() => {
    let s = seed * 9301 + 49297
    const rng = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
    return text.split("").map((ch) => {
      if (ch === " ") return { ch, space: true }
      const f = "f" + (1 + Math.floor(rng() * 5))
      const bg = rng() < 0.55 ? "b" + (1 + Math.floor(rng() * 6)) : "b6"
      const rot = (rng() * 14 - 7).toFixed(1)
      const u = rng() < 0.1 ? "u" : ""
      return { ch, f, bg, rot, u }
    })
  }, [text, seed])

  return (
    <span ref={ref} className={`ransom ${animate ? "ransom-anim" : ""} ${seen ? "in" : ""}`}>
      {chars.map((c, i) =>
        c.space ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className={`r ${c.f} ${c.bg} ${c.u}`}
            style={{ "--rot": `${c.rot}deg`, transform: `rotate(${c.rot}deg)`, transitionDelay: animate ? `${i * 28}ms` : "0s" }}
          >
            {c.ch}
          </span>
        )
      )}
    </span>
  )
}
