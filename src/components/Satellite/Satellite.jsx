import { useEffect, useRef, useState } from 'react'
import './Satellite.css'
import useInView, { reducedMotion } from '../../useInView.js'

// Wireframe satellite rotating in 3D: a nod to the pose-estimation thesis.
// The quaternion readout describes this render, not a model's output.

const box = (sx, sy, sz, ox = 0) => {
  const v = []
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x * sx + ox, y * sy, z * sz])
  const e = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]]
  return e.map(([a, b]) => [v[a], v[b]])
}

const panel = (side) => {
  const segs = []
  const x0 = side * 1.25, x1 = side * 4.2
  for (let i = 0; i <= 6; i++) { const x = x0 + ((x1 - x0) * i) / 6; segs.push([[x, -0.9, 0], [x, 0.9, 0]]) }
  for (const y of [-0.9, -0.3, 0.3, 0.9]) segs.push([[x0, y, 0], [x1, y, 0]])
  segs.push([[side * 1, 0, 0], [x0, 0, 0]])
  return segs
}

const dish = () => {
  const segs = []
  const n = 20
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, b = ((i + 1) / n) * Math.PI * 2
    segs.push([[Math.cos(a) * 0.6, Math.sin(a) * 0.6, 1.5], [Math.cos(b) * 0.6, Math.sin(b) * 0.6, 1.5]])
  }
  for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2; segs.push([[Math.cos(a) * 0.6, Math.sin(a) * 0.6, 1.5], [0, 0, 1.1]]) }
  segs.push([[0, 0, 1], [0, 0, 1.9]])
  return segs
}

const MODEL = [...box(1, 1, 1), ...panel(1), ...panel(-1), ...dish()]

const quat = (yaw, pitch, roll) => {
  const [cy, sy] = [Math.cos(yaw / 2), Math.sin(yaw / 2)]
  const [cp, sp] = [Math.cos(pitch / 2), Math.sin(pitch / 2)]
  const [cr, sr] = [Math.cos(roll / 2), Math.sin(roll / 2)]
  return [cr * cp * cy + sr * sp * sy, sr * cp * cy - cr * sp * sy, cr * sp * cy + sr * cp * sy, cr * cp * sy - sr * sp * cy]
}

const rotate = ([w, x, y, z], [px, py, pz]) => {
  // v' = q v q*
  const ix = w * px + y * pz - z * py, iy = w * py + z * px - x * pz, iz = w * pz + x * py - y * px, iw = -x * px - y * py - z * pz
  return [ix * w + iw * -x + iy * -z - iz * -y, iy * w + iw * -y + iz * -x - ix * -z, iz * w + iw * -z + ix * -y - iy * -x]
}

export default function Satellite({ compact = false }) {
  const canvasRef = useRef(null)
  const [wrapRef, inView] = useInView()
  const [q, setQ] = useState([1, 0, 0, 0])
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0, t = 0.8, last = 0, frame = 0
    const live = getComputedStyle(document.documentElement).getPropertyValue('--live').trim() || '#c6ff3d'

    const draw = (now) => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      if (last) t += Math.min(now - last, 50) / 1000
      last = now

      const qq = quat(t * 0.35 + pointer.current.x * 0.8, Math.sin(t * 0.21) * 0.5 + pointer.current.y * 0.6, Math.sin(t * 0.13) * 0.35)
      const s = Math.min(w, h) / 9.5
      const proj = (p) => {
        const [x, y, z] = rotate(qq, p)
        const k = 7 / (7 - z)
        return [w / 2 + x * s * k, h / 2 - y * s * k, z]
      }

      ctx.lineWidth = 1
      for (const [a, b] of MODEL) {
        const A = proj(a), B = proj(b)
        const depth = (A[2] + B[2]) / 2
        ctx.strokeStyle = `rgba(243,243,243,${0.28 + Math.max(0, depth + 2) * 0.12})`
        ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke()
      }
      // estimated pose axes
      const o = proj([0, 0, 0])
      ;[[2.2, 0, 0], [0, 2.2, 0], [0, 0, 2.6]].forEach((axis, i) => {
        const p = proj(axis)
        ctx.strokeStyle = i === 2 ? live : 'rgba(198,255,61,0.45)'
        ctx.lineWidth = i === 2 ? 1.6 : 1
        ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(p[0], p[1]); ctx.stroke()
        ctx.fillStyle = ctx.strokeStyle
        ctx.font = '10px "Martian Mono", monospace'
        ctx.fillText('xyz'[i], p[0] + 4, p[1] - 4)
      })
      // bounding box corners, like a detector's output
      ctx.strokeStyle = 'rgba(243,243,243,0.35)'
      const m = s * 4.6, c = 14
      ;[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => {
        const x = w / 2 + dx * m, y = h / 2 + dy * m * 0.62
        ctx.beginPath(); ctx.moveTo(x, y - dy * c); ctx.lineTo(x, y); ctx.lineTo(x - dx * c, y); ctx.stroke()
      })

      if (++frame % 6 === 0) setQ(qq)
      if (inView && !reducedMotion()) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw) // always paint one frame; loop only while in view
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }
  }

  return (
    <figure ref={wrapRef} className="sat" onPointerMove={onMove}>
      <canvas ref={canvasRef} className="sat-canvas" role="img" aria-label="Wireframe satellite rotating, with its estimated pose axes drawn over it." />
      {!compact && (
        <figcaption className="pl-caption mono">
          <span className="pl-caption-key caps">Pose</span>
          <span className="sat-q">
            q = [{q.map((n) => (n >= 0 ? ' ' : '') + n.toFixed(3)).join(', ')}]
            <em className="br-disclaim"> Live render of this drawing, not model output.</em>
          </span>
        </figcaption>
      )}
    </figure>
  )
}
