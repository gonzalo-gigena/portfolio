import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './scroll.js'
import Loader from './components/Loader/Loader.jsx'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Series from './components/Series/Series.jsx'
import Bill from './components/Bill/Bill.jsx'
import Rail from './components/Rail/Rail.jsx'
import Note from './components/Note/Note.jsx'
import Slot from './components/Slot/Slot.jsx'

document.documentElement.classList.add('js')

function App() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.dataset.in = ''; io.unobserve(e.target) }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.rise').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Loader />
      <a className="skip mono" href="#work">Skip to work</a>
      <Nav />
      <main>
        <Hero />
        <Series />
        <Bill />
        <Rail />
        <Note />
        <Slot />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
