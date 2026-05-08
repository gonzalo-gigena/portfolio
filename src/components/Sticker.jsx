import { useEffect, useState } from 'react'

export function Sticker({ initial, rotate = 0, zIndex = 1, tape = "top", children }) {
  const [pos, setPos] = useState(initial)
  const [drag, setDrag] = useState(null)
  const [z, setZ] = useState(zIndex)

  const onDown = (e) => {
    e.preventDefault()
    const p = e.touches ? e.touches[0] : e
    setDrag({ x: p.clientX - pos.x, y: p.clientY - pos.y })
    setZ(50)
  }

  useEffect(() => {
    if (!drag) return
    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e
      setPos({ x: p.clientX - drag.x, y: p.clientY - drag.y })
    }
    const onUp = () => setDrag(null)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [drag])

  return (
    <div
      className="sticker"
      style={{ left: pos.x, top: pos.y, zIndex: z, transform: `rotate(${rotate}deg)`, "--r": `${rotate}deg` }}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      {tape && <div className={`tape ${tape}`} />}
      {children}
    </div>
  )
}
