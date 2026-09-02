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
const AUTOPLAY_MS = 9000
const CROSSFADE_S = 2.2
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
  const contentY = useTransform(scrollY, [0, span * 1.1], [0, -48])
  const contentOpacity = useTransform(scrollY, [span * 0.35, span * 1.05], [1, 0])
  const contentScale = useTransform(scrollY, [0, span * 1.4], [1, 0.94])

  const coverStyle = reduced
    ? undefined
    : { y: contentY, opacity: contentOpacity, scale: contentScale }

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
      className="sticky top-nav z-0 isolate flex min-h-[calc(100svh_-_var(--spacing-nav))] flex-col overflow-hidden"
    >
      {/* Washed-back house photography with parallax + slow Ken Burns */}
      <motion.div
        className="absolute inset-0 -z-10"
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
              opacity: { duration: CROSSFADE_S, ease: 'easeInOut' },
              scale: { duration: AUTOPLAY_MS / 1000 + 2, ease: 'linear' },
            }}
          >
            <picture>
              <source srcSet={webp(heroImages[index])} type="image/webp" />
              <img
                src={heroImages[index]}
                alt=""
                className="h-full w-full object-cover object-[center_32%] [filter:saturate(0.92)_brightness(1.03)]"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Calm wash so the image reads quiet and the ink stays legible.
          Kept in the misty blue family (not pure white), stronger on the
          left where the headline sits, clearing to the photo on the right. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-mist/40 via-transparent to-sand/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-mist-2/92 via-mist-2/45 to-transparent sm:via-mist-2/35 sm:to-mist-2/0 lg:from-mist-2/88 lg:via-mist-2/25"
        aria-hidden="true"
      />

      {/* Headline column — flex child so it never overlaps the foot band */}
      <motion.div
        style={coverStyle}
        className="relative mx-auto flex w-full max-w-[1360px] min-h-0 flex-1 flex-col justify-center gap-8 px-5 pb-12 pt-24 lg:px-12 lg:pb-16 lg:pt-28"
      >
        <motion.div variants={container} initial={reduced ? false : 'hidden'} animate="show">
          <motion.p variants={item} className="eyebrow text-clay">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.5rem)] font-medium leading-[1.03] tracking-[-0.03em] text-ink [text-shadow:0_1px_20px_rgba(247,248,243,0.6)]"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-ink sm:text-xl"
          >
            {hero.sub}
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-6">
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

        <motion.div
          variants={item}
          initial={reduced ? false : 'hidden'}
          animate="show"
          className="flex items-center gap-3 text-ink-soft"
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
      </motion.div>

      {/* Stats band — frosted glass panel, always visible at the foot of the
          hero. Kept in normal flow as a flex child, so it can never overlap the
          headline, copy or buttons in the column above it. */}
      <div className="relative z-10 shrink-0 border-t border-white/40 bg-mist-2/45 backdrop-blur-xl backdrop-saturate-150">
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
                <dt className="font-display text-lg font-medium tracking-tight text-ink sm:text-2xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[11px] leading-snug text-ink-soft sm:text-xs">
                  {s.label}
                </dd>
              </motion.div>
            ))}
          </dl>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
            className="glass hidden max-w-md rounded-2xl p-5 sm:block lg:self-stretch"
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
      </div>
    </section>
  )
}
