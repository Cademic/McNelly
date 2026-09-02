import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { hero, heroImages, heroStats } from '../data/site'

const EASE = [0.16, 1, 0.3, 1] as const
const AUTOPLAY_MS = 6500
const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroImages.length

  useEffect(() => {
    if (reduced || paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [reduced, paused, count])

  // Scroll-driven motion. The hero is `position: sticky`, so measuring it with
  // useScroll({ target }) barely moves while it's pinned. Instead we drive
  // everything off the raw window scroll over the hero's own height — exactly
  // the distance during which the rounded page body rises to cover it.
  const { scrollY } = useScroll()
  const [heroH, setHeroH] = useState(0)
  useEffect(() => {
    const measure = () =>
      setHeroH(sectionRef.current?.offsetHeight || window.innerHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const span = heroH || 1

  const parallaxY = useTransform(scrollY, [0, span], ['0%', '14%'])
  // Background image zooms in as you scroll down over the pinned hero.
  const bgScale = useTransform(scrollY, [0, span], [1, 1.45])
  const contentY = useTransform(scrollY, [0, span * 0.6], [0, -48])
  const contentOpacity = useTransform(scrollY, [0, span * 0.55], [1, 0])
  const contentScale = useTransform(scrollY, [0, span], [1, 0.94])
  const bandOpacity = useTransform(scrollY, [0, span * 0.45], [1, 0])
  const bandY = useTransform(scrollY, [0, span * 0.5], [0, 40])

  const coverStyle = reduced
    ? undefined
    : { y: contentY, opacity: contentOpacity, scale: contentScale }
  const bandStyle = reduced ? undefined : { y: bandY, opacity: bandOpacity }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="sticky top-nav z-0 isolate flex h-[calc(100svh_-_var(--spacing-nav))] flex-col overflow-hidden"
    >
      {/* Headline block — sits at the TOP of the hero on the page's own misty
          ground, with no photo behind it. The house photography lives in its
          own panel below, so text and image never overlap (glideapps-style). */}
      <motion.div
        style={coverStyle}
        className="relative mx-auto w-full max-w-[1360px] shrink-0 px-5 pt-8 pb-6 lg:px-12 lg:pt-10 lg:pb-8"
      >
        <motion.div variants={container} initial={reduced ? false : 'hidden'} animate="show">
          <motion.p variants={item} className="eyebrow text-clay">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.03em] text-ink"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-lg text-base font-medium leading-relaxed text-ink sm:text-lg"
          >
            {hero.sub}
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-6">
            <a href={hero.primaryCta.href} className="btn-pine group">
              {hero.primaryCta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
            >
              {hero.secondaryCta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* House photography — its own framed panel filling the space between
          the headline block and the stats band. Parallax + slow Ken Burns. */}
      <div className="relative mx-3 min-h-[40svh] flex-1 overflow-hidden rounded-[1.5rem] sm:mx-5 lg:mx-8">
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: parallaxY, scale: bgScale }}
          aria-hidden="true"
        >
          <AnimatePresence>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.4, ease: 'easeInOut' },
                scale: { duration: AUTOPLAY_MS / 1000 + 2, ease: 'linear' },
              }}
            >
              <picture>
                <source srcSet={webp(heroImages[index])} type="image/webp" />
                <img
                  src={heroImages[index]}
                  alt=""
                  className="h-full w-full object-cover object-center [filter:saturate(0.96)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          variants={item}
          initial={reduced ? false : 'hidden'}
          animate="show"
          className="absolute bottom-4 left-4 flex items-center gap-2.5 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] lg:bottom-5 lg:left-6"
        >
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </motion.svg>
          <span className="eyebrow text-[11px]">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Stats band — solid frosted band on the page ground, directly below
          the photo panel. Normal flow, so it never overlaps anything above. */}
      <motion.div
        style={bandStyle}
        className="relative z-10 shrink-0 border-t border-line bg-sand/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-9">
          <dl className="grid flex-1 grid-cols-3 divide-x divide-line">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.7, ease: EASE }}
                className={i === 0 ? 'pr-4' : 'px-4'}
              >
                <dt className="flex items-baseline gap-1 font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.6rem]">
                  {s.value}
                  {s.suffix && (
                    <span className="text-base font-normal text-ink-mute sm:text-lg">
                      {s.suffix}
                    </span>
                  )}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-soft">{s.label}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
            className="glass hidden max-w-md rounded-2xl p-5 lg:block lg:self-stretch"
          >
            <p className="text-sm leading-relaxed text-ink-soft">{hero.note}</p>
            <a
              href="#about"
              className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-clay"
            >
              Discover more
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
