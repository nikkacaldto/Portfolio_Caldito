import { GraduationCap } from '@phosphor-icons/react'
import { education } from '@/data/portfolio'

export default function Education() {
  return (
    <section id="education" className="section section--alt" aria-labelledby="edu-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">Background</p>
        <h2 id="edu-heading">Education</h2>
        <ul className="edu-list">
          {education.map((item) => (
            <li key={item.school} className="edu-card">
              <GraduationCap size={28} weight="duotone" className="edu-card__icon" aria-hidden />
              <div>
                <h3>{item.school}</h3>
                {item.location && <p className="muted">{item.location}</p>}
                <p>{item.credential}</p>
                <p className="muted">
                  {item.dates}
                  {item.note ? ` · ${item.note}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
