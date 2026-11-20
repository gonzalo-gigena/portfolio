import './Odometer.css'

const DIGITS = [...'0123456789']

// Rolling digits: each numeral is a 0–9 strip translated into place. `run` false parks every strip at 0.
export default function Odometer({ value, run = true, className = '' }) {
  return (
    <span className={`odo ${className}`}>
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odo-d" aria-hidden="true">
            <span className="odo-strip" style={{ transform: `translateY(${run ? -ch * 10 : 0}%)`, transitionDelay: `${i * 70}ms` }}>
              {DIGITS.map((d) => <span key={d}>{d}</span>)}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">{ch}</span>
        ),
      )}
    </span>
  )
}
