import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { mailtoConsult, nav, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'

const SECTION_IDS = nav.map((n) => n.href.slice(1))
const EASE = [0.16, 1, 0.3, 1] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduced ? false : { y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-line bg-mist-2/70 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
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

        <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/45 px-2 py-1 backdrop-blur-md md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/80 shadow-sm"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
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
          <a href={mailtoConsult} className="btn-pine !px-5 !py-2.5 !text-sm">
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

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-line bg-mist-2/90 backdrop-blur-xl md:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                className="block border-b border-line px-5 py-4 text-sm font-medium text-ink"
              >
                {item.label}
              </motion.a>
            ))}
            <a
              href={mailtoConsult}
              onClick={() => setOpen(false)}
              className="block px-5 py-4 text-center text-sm font-semibold text-pine"
            >
              Book a Consultation →
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
