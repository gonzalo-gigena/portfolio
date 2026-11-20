import './Hero.css'
import PixelName from '../PixelName/PixelName.jsx'
import Arrow from '../Arrow/Arrow.jsx'
import { hero } from './hero.data.js'
import { links } from '../../links.js'

export default function Hero() {
  return (
    <section id="top" className="hero" tabIndex={-1} aria-labelledby="hero-name">
      <PixelName lines={hero.name} />
      <h1 id="hero-name" className="sr-only">Gonzalo Gigena, Full-Stack Software Engineer</h1>

      <div className="hero-grid grid">
        <p className="hero-intro">
          <strong>Gonzalo Gigena<sup>®</sup></strong> — {hero.intro}
        </p>
        <ul className="hero-side mono">
          <li>{hero.years}</li>
          <li className="dim">{hero.place}</li>
          <li><a className="link" href={links.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a></li>
          <li><a className="link" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a></li>
        </ul>
        <p className="hero-stack mono dim">{hero.stack}</p>
      </div>
    </section>
  )
}
