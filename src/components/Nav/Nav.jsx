import { useEffect, useState } from 'react'
import './Nav.css'
import { sections } from '../../links.js'

export default function Nav() {
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // section-aware: whichever section crosses the middle of the viewport is current
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }, { rootMargin: '-50% 0px -50% 0px' })
    const els = ['top', ...sections.map((s) => s.id)].map((id) => document.getElementById(id)).filter(Boolean)
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    // progress hairline: CSS var updated on scroll, one write per frame
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight
        document.documentElement.style.setProperty('--progress', max > 0 ? scrollY / max : 0)
      })
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${active && active !== 'top' ? 'nav--scrolled' : ''}`}>
      <div className="nav-progress" aria-hidden="true" />
      <a href="#top" className="nav-mark" aria-label="Gonzalo Gigena, back to top">
        <span className="nav-mark-card" aria-hidden="true" />
        <span className="nav-mark-name">Gonzalo Gigena</span>
      </a>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav-list" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Index'}
      </button>
      <nav aria-label="Sections">
        <ul id="nav-list" className={`nav-list ${open ? 'is-open' : ''}`}>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`nav-link ${active === s.id ? 'is-active' : ''}`}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
