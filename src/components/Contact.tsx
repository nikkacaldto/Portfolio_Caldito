import { FormEvent, useState } from 'react'
import { EnvelopeSimple, GithubLogo, LinkedinLogo, MapPin, Phone } from '@phosphor-icons/react'
import { profile, socials } from '@/data/portfolio'
import { MAX_EMAIL, MAX_MESSAGE, MAX_NAME, readLead, submitLead, SubmitError } from '@/lib/contact'

const icons = {
  linkedin: LinkedinLogo,
  github: GithubLogo,
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const lead = readLead(new FormData(e.currentTarget))
    if (!lead) {
      setStatus('error')
      setError('Please enter a name, a valid email, and a message.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitLead(lead)
      setStatus('ok')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof SubmitError ? err.message : 'Something went wrong. Please email me directly.')
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading" data-reveal>
      <div className="container contact">
        <div>
          <p className="eyebrow">Let’s talk</p>
          <h2 id="contact-heading">Contact</h2>
          <ul className="contact-list">
            <li>
              <EnvelopeSimple size={20} aria-hidden />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <Phone size={20} aria-hidden />
              <a href={profile.telHref}>{profile.phoneDisplay}</a>
            </li>
            <li>
              <MapPin size={20} aria-hidden />
              <span>{profile.location}</span>
            </li>
          </ul>
          <div className="socials">
            {socials.map((s) => {
              const Icon = icons[s.network]
              return (
                <a key={s.network} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon size={22} weight="fill" />
                </a>
              )
            })}
          </div>
        </div>
        <form className="form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input name="name" type="text" maxLength={MAX_NAME} autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" maxLength={MAX_EMAIL} autoComplete="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} maxLength={MAX_MESSAGE} required />
          </label>
          <div className="hp" aria-hidden="true">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'ok' && <p className="form__ok" role="status">Thanks — I’ll get back to you soon.</p>}
          {status === 'error' && (
            <p className="form__err" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
