import './Note.css'
import { note } from './note.data.js'

// stable pseudo-random scatter per word, so the layout never jumps between renders
const rand = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
  return x - Math.floor(x) - 0.5
}

export default function Note() {
  const words = note.split(' ')
  return (
    <section id="about" className="note page" aria-labelledby="note-t">
      <h2 id="note-t" className="sr-only">About</h2>
      <p className="note-text">
        {words.map((w, i) => {
          const em = w.startsWith('*')
          const text = w.replace(/\*/g, '')
          const style = { '--dx': `${rand(i, 1) * 60}vw`, '--dy': `${rand(i, 2) * 50}vh`, '--r': `${rand(i, 3) * 24}deg` }
          return (
            <span key={i} className="note-w" style={style}>
              {em ? <em>{text}</em> : text}{' '}
            </span>
          )
        })}
      </p>
    </section>
  )
}
