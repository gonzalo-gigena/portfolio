import './Contact.css'
import Deco from '../Deco/Deco.jsx'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <Deco set="contact" />
      <div className="cta-block reveal">
        <h2>let's build something.</h2>
        <p>Open to backend, full-stack and AI tooling roles. Remote-friendly from Córdoba, Argentina.</p>
        <div className="contact-links">
          <a className="btn btn-pill" href="mailto:gonzalo.gigena.alvarez@gmail.com">✉ email me</a>
          <a className="btn btn-ghost" href="https://github.com/gonzalo-gigena" target="_blank" rel="noreferrer">github ↗</a>
        </div>
      </div>
      <footer className="footer">© {new Date().getFullYear()} Gonzalo Gigena Alvarez</footer>
    </section>
  )
}
