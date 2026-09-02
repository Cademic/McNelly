import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { contactHref, nav, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = nav.map((n) => n.href.slice(1))
const EASE = [0.16, 1, 0.3, 1] as const

type PillRect = { left: number; width: number }

export function Navbar() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const active = useActiveSection(SECTION_IDS)

  const navRef = useRef<HTMLElement>(null)
  const [pill, setPill] = useState<PillRect | null>(null)

  // Reading-progress bar that fills left-to-right along the bottom of the navbar
  // as the page scrolls.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
  })

  // "Home" / logo jump straight to the very top of the page — the hero is
  // position: sticky, so a bare #top anchor lands a nav-height short of 0.
  const goTop = (e: MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Slide the highlight pill to sit behind the active section's link.
  useEffect(() => {
    const measure = () => {
      const el = navRef.current?.querySelector<HTMLElement>(
        `[data-section="${active}"]`,
      )
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  return (
    <>
    <motion.header
      initial={reduced ? false : { y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="sticky top-0 z-50 border-b border-transparent bg-sand"
    >
      <div className="mx-auto flex h-nav max-w-[1360px] items-center justify-between px-5 lg:px-12">
        <div className="flex items-center gap-6">
          <a href="#top" onClick={goTop} className="group flex items-center" aria-label={site.company}>
            <img
              src="/logo-full.png"
              alt={`${site.company} logo`}
              className="h-10 w-auto sm:h-11"
            />
          </a>

          <nav
            ref={navRef}
            className="relative hidden items-center gap-1 rounded-full border border-white/50 bg-white/45 px-2 py-1 backdrop-blur-md lg:flex"
          >
            {pill && (
              <motion.span
                aria-hidden
                className="absolute inset-y-1 -z-10 rounded-full bg-white/80 shadow-sm"
                initial={false}
                animate={{ left: pill.left, width: pill.width }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 34 }
                }
              />
            )}
            {nav.map((item) => {
              const id = item.href.slice(1)
              const isActive = active === id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={item.href === '#top' ? goTop : undefined}
                  data-section={id}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${site.phone.replace(/[^\d]/g, '')}`}
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            {site.phone}
          </a>
          <a href={contactHref} className="btn-pine !px-5 !py-2.5 !text-sm">
            Book a Consultation
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-pine"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
    </motion.header>

    {createPortal(
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col pt-nav backdrop-blur-xl backdrop-saturate-150 bg-sand/90 lg:hidden"
          >
            <div className="flex flex-col overflow-y-auto px-5 py-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === '#top') goTop(e)
                    setOpen(false)
                  }}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  className="block border-b border-line py-5 text-lg font-medium text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={contactHref}
                onClick={() => setOpen(false)}
                className="mt-6 block text-center text-base font-semibold text-pine"
              >
                Book a Consultation →
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>,
      document.body,
    )}
  </>
  )
}
