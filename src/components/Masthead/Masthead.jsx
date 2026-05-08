import './Masthead.css'
import { useEffect, useState } from 'react'

export function Masthead() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = t.toTimeString().slice(0, 8)
  const date = t.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  return (
    <header className="masthead">
      <div className="masthead-rule">
        <div><span className="blink">●</span> live edition · independently published</div>
        <div className="center">— since 1997 —</div>
        <div className="right">price: 0.00 / cup of coffee</div>
      </div>
      <h1 className="masthead-title">
        <span className="swap-1">THE</span>{" "}
        <span className="punk-bg swap-3">gonzalo</span>{" "}
        <span className="swap-2">GAZETTE</span>
      </h1>
      <div className="masthead-meta">
        <div className="col">
          <span>vol. iii · no. 426</span>
          <b>{date.toLowerCase()}</b>
        </div>
        <div className="col center">
          <span>weather, córdoba</span>
          <b>24°c · partly debugged</b>
        </div>
        <div className="col right">
          <span>local time</span>
          <b>{time}</b>
        </div>
      </div>
      <nav className="mast-nav">
        <a href="#home">front page</a>
        <a href="#now">bulletin</a>
        <a href="#stack">inventory</a>
        <a href="#experience">careers</a>
        <a href="#press">archives</a>
        <a href="#notes">field notes</a>
        <a href="#contact">classifieds</a>
      </nav>
    </header>
  )
}
