import { ArrowRight, DownloadSimple, EnvelopeSimple, MapPin } from '@phosphor-icons/react'
import { profile } from '@/data/portfolio'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-name">
      <div className="container hero__grid">
        <h1 id="hero-name">{profile.name}</h1>
        <p className="hero__title">{profile.title}</p>
        <p className="hero__tagline">{profile.tagline}</p>
        <p className="hero__loc">
          <MapPin size={18} weight="fill" aria-hidden />
          {profile.location}
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            View Projects
            <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
          <a className="btn btn--ghost" href={profile.cvHref} download={profile.cvDownloadName}>
            <DownloadSimple size={18} weight="bold" aria-hidden />
            {profile.cvLabel}
          </a>
          <a className="btn btn--ghost" href="#contact">
            <EnvelopeSimple size={18} weight="bold" aria-hidden />
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}
