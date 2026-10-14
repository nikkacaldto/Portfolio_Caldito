/**
 * Motion preference used by the theme sweep. Visitors who prefer reduced
 * motion get an instant theme switch instead of the circle wipe.
 */
export function motionReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
