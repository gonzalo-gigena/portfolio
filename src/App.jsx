import { CursorLayer, Konami, Disruptors } from './Fx.jsx'
import { Masthead } from './components/Masthead.jsx'
import { Hero } from './components/Hero.jsx'
import { MarqueeBar } from './components/MarqueeBar.jsx'
import { Now } from './components/Now.jsx'
import { StackInventory } from './components/StackInventory.jsx'
import { Experience } from './components/Experience.jsx'
import { PressClippings } from './components/PressClippings.jsx'
import { FieldNotes } from './components/FieldNotes.jsx'
import { Contact } from './components/Contact.jsx'
import { Footer } from './components/Footer.jsx'
import { ScrollParade } from './components/ScrollParade.jsx'
import { ScrollHeadline } from './components/ScrollHeadline.jsx'
import { PixelIcon } from './components/PixelIcon.jsx'

function ParadeA() {
  return (
    <>
      <PixelIcon kind="floppy" size={20} color="#efd02b" />
      <b>SCROLL</b>
      <em>· cut here ·</em>
      <PixelIcon kind="diamond" size={20} color="#a64a3a" />
      <span>★</span>
      <em>more below</em>
      <PixelIcon kind="bolt" size={20} color="#3d6e6e" />
      <b>CAREERS</b>
      <span>★</span>
      <PixelIcon kind="skull" size={20} color="#efd02b" />
      <em>keep going</em>
      <b>↓</b>
    </>
  )
}

function ParadeB() {
  return (
    <>
      <PixelIcon kind="star" size={20} color="#a64a3a" />
      <b>ARCHIVES</b>
      <em>· photo morgue ·</em>
      <PixelIcon kind="moon" size={20} color="#3d6e6e" />
      <span>★</span>
      <em>file under: nostalgia</em>
      <PixelIcon kind="heart" size={20} color="#efd02b" />
      <b>MORE</b>
      <span>↓</span>
      <PixelIcon kind="coffee" size={20} color="#c79b3a" />
      <em>almost there</em>
    </>
  )
}

function ParadeC() {
  return (
    <>
      <PixelIcon kind="pin" size={20} color="#efd02b" />
      <b>FIELD NOTES</b>
      <em>· marginalia ·</em>
      <PixelIcon kind="diamond" size={20} color="#a64a3a" />
      <span>★</span>
      <em>overheard</em>
      <PixelIcon kind="bolt" size={20} color="#3d6e6e" />
      <b>SAY HI</b>
      <span>↓</span>
    </>
  )
}

export default function App() {
  return (
    <>
      <div className="halftone" />
      <div className="grain" />
      <div className="dither-bg" />
      <main className="page">
        <Masthead />
        <Hero />
        <div className="torn"><span className="ribbon">✂ ✂ ✂ cut here · cut here · cut here · cut here · cut here · cut here ✂ ✂ ✂</span></div>
        <MarqueeBar />
        <Now />
        <ScrollParade direction={1} speed={0.5} items={<ParadeA />} />
        <ScrollHeadline direction={-1} speed={0.5}>
          <span>the </span><span className="alt">tools</span><span className="alt3"> of the </span><span className="alt2">trade</span><span className="alt4">·</span>
          <span>the </span><span className="alt">tools</span><span className="alt3"> of the </span><span className="alt2">trade</span><span className="alt4">·</span>
        </ScrollHeadline>
        <StackInventory />
        <div className="torn"><span className="ribbon">★ ★ ★ careers · careers · careers · careers · careers · careers · careers ★ ★ ★</span></div>
        <Experience />
        <ScrollParade direction={-1} speed={0.5} items={<ParadeB />} />
        <PressClippings />
        <ScrollHeadline direction={1} speed={0.55}>
          <span className="alt2">field </span><span>notes </span><span className="alt3">from the </span><span className="alt">margins</span><span className="alt4">·</span>
          <span className="alt2">field </span><span>notes </span><span className="alt3">from the </span><span className="alt">margins</span><span className="alt4">·</span>
        </ScrollHeadline>
        <FieldNotes />
        <ScrollParade direction={1} speed={0.5} items={<ParadeC />} />
        <Contact />
        <Footer />
      </main>
      <div className="vignette" />
      <div className="scanlines" />
      <div className="flicker" />
      <CursorLayer />
      <Konami />
      <Disruptors />
    </>
  )
}
