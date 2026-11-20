import './scroll.js'
import Hud from './components/Hud/Hud.jsx'
import Hero from './components/Hero/Hero.jsx'
import Intro from './components/Intro/Intro.jsx'
import Work from './components/Work/Work.jsx'
import Expertise from './components/Expertise/Expertise.jsx'
import Experience from './components/Experience/Experience.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'

export default function App() {
  return (
    <>
      <Hud />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Expertise />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  )
}
