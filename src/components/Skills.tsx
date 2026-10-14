import { skillGroups } from '@/data/portfolio'

export default function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">Capabilities</p>
        <h2 id="skills-heading">Skills</h2>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-card">
              <h3>{group.title}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
