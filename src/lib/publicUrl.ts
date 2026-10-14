/**
 * Prefix a file from `/public` with Vite’s `base`.
 * Required on GitHub project pages (`/RepoName/...`) so CV, posters, and favicon
 * do not resolve at the domain root.
 */
export function publicUrl(path: string): string {
  const trimmed = path.trim()
  if (!trimmed || /^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('data:')) {
    return trimmed
  }

  let cut = trimmed.length
  const q = trimmed.indexOf('?')
  const h = trimmed.indexOf('#')
  if (q >= 0) cut = Math.min(cut, q)
  if (h >= 0) cut = Math.min(cut, h)

  const file = trimmed.slice(0, cut).replace(/^\/+/, '')
  const suffix = trimmed.slice(cut)
  const base = import.meta.env.BASE_URL
  const prefix = base.endsWith('/') ? base : `${base}/`
  return `${prefix}${file}${suffix}`
}
