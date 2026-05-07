import { useEffect, useState } from 'react'

export function Topbar() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = t.toTimeString().slice(0, 8)
  return (
    <div className="topbar">
      <div className="left">
        <span className="blink">●</span>
        <span>gonzalo.exe</span>
        <span style={{ opacity: 0.6 }}>// 256kb free</span>
      </div>
      <nav>
        <a href="#now">now</a>
        <a href="#experience">work</a>
        <a href="#contact">contact</a>
      </nav>
      <div style={{ opacity: 0.7 }}>{time} · cba/ar</div>
    </div>
  )
}
