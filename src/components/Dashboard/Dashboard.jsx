import './Dashboard.css'
import { nav, filters, passRate, durations, coverage } from './dashboard.data.js'

const LO = 85, HI = 100
const pts = passRate.map((v, i) => [(i / (passRate.length - 1)) * 600, 120 - ((v - LO) / (HI - LO)) * 120])
const line = pts.map((p) => p.join(',')).join(' ')
const maxMin = Math.max(...durations.map((d) => d.min))

// The innermost layer of the lakehouse scene: a recreation of the observability dashboard.
export default function Dashboard() {
  return (
    <figure className="dash" aria-label="Recreation of the telemetry dashboard, synthetic data">
      <aside className="dash-nav mono">
        <span className="dash-brand">Telemetry</span>
        {nav.map((n, i) => <span key={n} className={i === 0 ? 'is-on' : ''}>{n}</span>)}
      </aside>
      <div className="dash-main">
        <header className="dash-head">
          <span className="dash-title">Overview</span>
          <span className="dash-filters">{filters.map((f) => <span key={f} className="dash-chip mono">{f}</span>)}</span>
        </header>

        <section className="dash-card dash-card--wide">
          <span className="dash-card-head"><span>Test pass rate</span><span className="mono dim">% · per run</span></span>
          <svg viewBox="0 0 600 130" className="dash-chart" preserveAspectRatio="none" aria-hidden="true">
            {[0, 40, 80, 120].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="dash-grid" />)}
            <polyline points={line} className="dash-line" />
            {pts.map(([x, y], i) => passRate[i] < 93 && <rect key={i} x={x - 3} y={y - 3} width="6" height="6" className="dash-fail" />)}
          </svg>
          <span className="dash-axis mono dim"><span>Run 1</span><span>Run 30</span></span>
        </section>

        <section className="dash-card">
          <span className="dash-card-head"><span>CI duration by pipeline</span><span className="mono dim">min</span></span>
          <ul className="dash-bars">
            {durations.map((d) => (
              <li key={d.name}>
                <span className="mono dim">{d.name}</span>
                <span className="dash-bar"><i style={{ width: `${(d.min / maxMin) * 100}%` }} /></span>
                <span className="mono">{d.min.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-card">
          <span className="dash-card-head"><span>Coverage by service</span><span className="mono dim">line %</span></span>
          <table className="dash-table">
            <tbody>
              {coverage.map((c) => (
                <tr key={c.service}>
                  <td className="mono dim">{c.service}</td>
                  <td>{c.pct}%</td>
                  <td className="mono dim">{c.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <figcaption className="dash-cap mono">Illustrative recreation · synthetic data</figcaption>
    </figure>
  )
}
