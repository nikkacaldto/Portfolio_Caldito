import { experience } from '@/data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">Work</p>
        <h2 id="exp-heading">Experience</h2>
        <ol className="timeline">
          {experience.map((job) => (
            <li key={`${job.role}-${job.organization}`} className="timeline__item">
              <p className="timeline__dates">{job.dates}</p>
              <h3>
                {job.role}
                <span className="muted"> · {job.organization}</span>
              </h3>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
