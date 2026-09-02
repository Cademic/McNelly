import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import { contactHref, nav, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = nav.map((n) => n.href.slice(1))
const EASE = [0.16, 1, 0.3, 1] as const

type PillRect = { left: number; width: number }

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const active = useActiveSection(SECTION_IDS)
  const { scrollYProgress } = useScroll()

  const navRef = useRef<HTMLElement>(null)
  const [pill, setPill] = useState<PillRect | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      className={`sticky top-0 z-50 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-line bg-sand/80'
          : 'border-b border-transparent bg-sand/70'
      }`}
    >
      <div className="mx-auto flex h-nav max-w-[1360px] items-center justify-between px-5 lg:px-12">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-pine font-sans text-lg font-extrabold text-white transition-colors group-hover:bg-pine-2">
            M
          </span>
          <span className="font-sans text-base font-extrabold uppercase leading-none tracking-tight text-ink sm:text-lg">
            {site.company}
          </span>
        </a>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 rounded-full border border-white/50 bg-white/45 px-2 py-1 backdrop-blur-md md:flex"
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

        <div className="hidden items-center gap-5 md:flex">
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
          className="text-ink md:hidden"
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
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-pine"
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
            className="fixed inset-0 z-40 flex flex-col pt-nav backdrop-blur-xl backdrop-saturate-150 bg-sand/90 md:hidden"
          >
            <div className="flex flex-col overflow-y-auto px-5 py-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
