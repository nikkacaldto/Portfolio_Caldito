import { useEffect, useState } from 'react'
import { DownloadSimple, List, X } from '@phosphor-icons/react'
import ThemeButton from '@/components/ThemeButton'
import { nav, profile } from '@/data/portfolio'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand">
          {profile.shortName}
        </a>
        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="btn btn--ghost btn--sm" href={profile.cvHref} download={profile.cvDownloadName}>
            <DownloadSimple size={16} weight="bold" aria-hidden />
            {profile.cvLabel}
          </a>
          <ThemeButton />
          <button
            type="button"
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="nav__drawer">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary" href={profile.cvHref} download={profile.cvDownloadName} onClick={() => setOpen(false)}>
            {profile.cvLabel}
          </a>
        </div>
      )}
    </header>
  )
}
