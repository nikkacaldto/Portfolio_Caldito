import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 720px)').matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="nav-root">
      <div className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
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
      </div>
      {open &&
        createPortal(
          <div id="mobile-nav" className="nav__drawer" role="dialog" aria-modal="true" aria-label="Menu">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a
              className="btn btn--primary"
              href={profile.cvHref}
              download={profile.cvDownloadName}
              onClick={() => setOpen(false)}
            >
              {profile.cvLabel}
            </a>
          </div>,
          document.body,
        )}
    </header>
  )
}
