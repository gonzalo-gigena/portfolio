import { useState } from 'react'
import './Bill.css'
import { bill } from './bill.data.js'

export default function Bill() {
  const [pick, setPick] = useState(bill[0].items[0])

  return (
    <section id="expertise" className="bill page" aria-labelledby="bill-t">
      <header className="bill-head">
        <h2 id="bill-t" className="bill-h rise">The bill</h2>
        <p className="bill-sub rise">Billed by weight: the bigger the name, the more of the work it carried. Point at any of them to see where it was used.</p>
      </header>

      <div className="bill-body">
        {bill.map((g) => (
          <div key={g.group} className="bill-row rise">
            <div className="bill-side">
              <h3 className="bill-group label">{g.group}</h3>
              {g.items.includes(pick) && (
                <p className="bill-note" aria-live="polite">
                  <span className="bill-note-name">{pick.name}</span>
                  {pick.where}
                </p>
              )}
            </div>
            <ul className="bill-items">
              {g.items.map((it) => (
                <li key={it.name}>
                  <button
                    className={`bill-item t${it.tier} ${pick.name === it.name ? 'is-live' : ''}`}
                    onMouseEnter={() => setPick(it)}
                    onFocus={() => setPick(it)}
                    onClick={() => setPick(it)}
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  )
}
