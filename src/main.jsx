import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Skills from './components/Skills/Skills.jsx'
import Experience from './components/Experience/Experience.jsx'
import Extras from './components/Extras/Extras.jsx'
import Contact from './components/Contact/Contact.jsx'

function App() {
  // Scroll reveal: children have mounted by the time this runs
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Extras />
        <Contact />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
