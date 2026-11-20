import { useState } from 'react'
import './Slot.css'
import { links } from '../../links.js'
import Arrow from '../Arrow/Arrow.jsx'

export default function Slot() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked: the mailto link still works */ }
  }

  return (
    <section id="contact" className="slot page" aria-labelledby="slot-t">
      <h2 id="slot-t" className="slot-h">
        <span className="rise">Have something</span>
        <span className="rise">interesting</span>
        <span className="rise">to build?</span>
      </h2>

      <div className="slot-card rise">
        <div className="slot-head mono caps">
          <span className="slot-no">No.04</span>
          <span className="dim">/04 · open</span>
        </div>
        <p className="slot-lead">The last card in the run is empty. Tell me what goes on it.</p>

        <div className="slot-email">
          <a className="slot-mail" href={`mailto:${links.email}`}>{links.email}</a>
          <button className="slot-copy" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
        </div>

        <ul className="slot-links">
          <li><a className="link-u" href={links.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a></li>
          <li><a className="link-u" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a></li>
        </ul>
        <span className="slot-numeral numeral" aria-hidden="true">04</span>
      </div>

      <footer className="slot-foot label">
        <span>© {new Date().getFullYear()} Gonzalo Gigena Alvarez</span>
        <span>Córdoba, Argentina</span>
        <a className="link-u" href="#top">Back to top<Arrow dir="n" /></a>
      </footer>
    </section>
  )
}
