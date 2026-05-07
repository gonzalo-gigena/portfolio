import { CursorLayer, Konami } from './Fx.jsx'
import { Topbar } from './components/Topbar.jsx'
import { Hero } from './components/Hero.jsx'
import { MarqueeBar } from './components/MarqueeBar.jsx'
import { Now } from './components/Now.jsx'
import { Experience } from './components/Experience.jsx'
import { Contact } from './components/Contact.jsx'
import { Footer } from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <div className="dither-bg" />
      <Topbar />
      <main className="page">
        <Hero />
        <div className="glitch-divider" />
        <MarqueeBar />
        <Now />
        <div className="glitch-divider" />
        <Experience />
        <div className="glitch-divider" />
        <Contact />
        <Footer />
      </main>
      <div className="vignette" />
      <div className="scanlines" />
      <div className="flicker" />
      <CursorLayer />
      <Konami />
    </>
  )
}
