import { useState } from 'react'
import './Expertise.css'
import PixelHeading from '../PixelHeading/PixelHeading.jsx'
import { index } from '../WorkIndex/workIndex.data.js'
import { intro, blocks, usedIn } from './expertise.data.js'

const refsFor = (tag) => [...(usedIn[tag] ?? []), ...index.filter((r) => r.tags.includes(tag)).map((r) => `${r.no} ${r.name}`)]

// 03 — Möbius-style indexed blocks. Each tag cross-references the work that used it.
export default function Expertise() {
  const [open, setOpen] = useState(null)
  return (
    <section id="expertise" className="expertise section" tabIndex={-1} aria-labelledby="expertise-title">
      <div className="grid">
        <PixelHeading id="expertise-title" className="section-title display">Expertise</PixelHeading>
        <div className="label-col">
          <p><span className="mono dim" aria-hidden="true">(03)</span>{intro}</p>
        </div>
        <div className="content-col">
          {blocks.map((b) => (
            <article key={b.key} className="xp-block" aria-labelledby={`xp-${b.key}`}>
              <span className="xp-key" aria-hidden="true">{b.key} /</span>
              <h3 id={`xp-${b.key}`} className="sr-only">{b.name}</h3>
              <p className="xp-line">{b.line}</p>
              <ul className="xp-tags">
                {b.tags.map((t) => {
                  const refs = refsFor(t)
                  const id = `xp-${t.replace(/\W+/g, '')}`
                  return (
                    <li key={t} className="xp-tag">
                      <button
                        type="button"
                        className={`pill ${open === t ? 'is-on' : ''}`}
                        aria-describedby={id}
                        onPointerEnter={() => setOpen(t)}
                        onPointerLeave={() => setOpen(null)}
                        onFocus={() => setOpen(t)}
                        onBlur={() => setOpen(null)}
                      >
                        {t}
                      </button>
                      <span id={id} role="tooltip" className={`xp-tip mono ${open === t ? 'is-on' : ''}`}>
                        {refs.length ? <>Used in · {refs.join(' · ')}</> : 'Toolbox · no public project yet'}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
