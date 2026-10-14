import { SealCheck } from '@phosphor-icons/react'
import { certifications } from '@/data/portfolio'

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certs-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">Credentials</p>
        <h2 id="certs-heading">Certifications</h2>
        <ul className="cert-grid">
          {certifications.map((c) => (
            <li key={c.title} className="cert-card">
              <SealCheck size={24} weight="duotone" aria-hidden />
              <h3>{c.title}</h3>
              <p className="muted">
                {c.issuer} · {c.date}
                {c.duration ? ` · ${c.duration}` : ''}
              </p>
              {c.trainer ? <p className="muted">Trainer: {c.trainer}</p> : null}
              {c.description ? <p className="cert-card__desc">{c.description}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
