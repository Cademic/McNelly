import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently dominant in the viewport, for nav
 * highlighting. Returns the active id (without `#`), or '' before any section
 * has been observed.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let bestId = ''
        let bestRatio = 0
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }
        if (bestId) setActive(bestId)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
