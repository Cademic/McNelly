import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently dominant in the viewport, for nav
 * highlighting. `ids` must be listed in the order the sections appear on the
 * page. Returns the active id (without `#`).
 *
 * Uses scroll position rather than IntersectionObserver so that short trailing
 * sections (e.g. Contact) still activate when the page can't scroll far enough
 * to bring them to the middle of the viewport.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const els = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
      if (els.length === 0) return

      const doc = document.documentElement
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      if (atBottom) {
        setActive(els[els.length - 1].id)
        return
      }

      // The section whose top has most recently crossed a line ~35% down
      // the viewport is the one being read.
      const line = window.scrollY + window.innerHeight * 0.35
      let current = els[0].id
      for (const el of els) {
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = el.id
        else break
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
