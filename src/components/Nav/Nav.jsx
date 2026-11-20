import './Nav.css'

const links = ['skills', 'experience', 'more']

export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-logo">gg.</a>
      <nav className="nav-links">
        {links.map((l) => <a key={l} className="nav-link" href={`#${l}`}>{l}</a>)}
      </nav>
      <a href="#contact" className="btn btn-pill nav-cta">contact</a>
    </header>
  )
}
