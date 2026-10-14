/** Scroll an in-page section into view, honoring the sticky nav offset. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector('.nav-root')
  const navH = nav instanceof HTMLElement ? nav.getBoundingClientRect().height : 68
  const dest = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navH - 12)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Chrome drops a new smooth scrollTo while another is in flight, which made
  // repeated (or rapid) navbar clicks land on the wrong section.
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo({ top: window.scrollY, behavior: 'auto' })
  html.style.scrollBehavior = prev

  window.scrollTo({ top: dest, behavior: reduce ? 'auto' : 'smooth' })
}

/**
 * Intercept same-page `#hash` clicks so repeating a nav item still scrolls,
 * instead of the browser ignoring an unchanged fragment.
 */
export function bindInPageNav(onNavigate?: () => void): () => void {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = event.target
    if (!(target instanceof Element)) return
    const link = target.closest('a[href^="#"]')
    if (!(link instanceof HTMLAnchorElement)) return
    if (link.hasAttribute('download')) return
    const href = link.getAttribute('href')
    if (!href || href === '#') return
    const id = decodeURIComponent(href.slice(1))
    if (!document.getElementById(id)) return
    event.preventDefault()
    onNavigate?.()
    scrollToSection(id)
    history.replaceState(null, '', href)
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
