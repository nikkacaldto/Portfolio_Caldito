import { about, stats } from '@/data/portfolio'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">About</p>
        <h2 id="about-heading">About Me</h2>
        <p className="lede">{about.body}</p>
        <ul className="stat-grid">
          {stats.map((s) => (
            <li key={s.label} className="stat-card">
              <p className="stat-card__value">{s.value}</p>
              <p className="stat-card__label">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
