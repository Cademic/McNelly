import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { hero, heroImages } from '../data/site'

const EASE = [0.16, 1, 0.3, 1] as const
const AUTOPLAY_MS = 8000
const CROSSFADE_S = 0.8

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
  const count = heroImages.length

  // Always cycle on the timer for as long as the page is open — no pause on
  // hover/focus, and it runs even when the user prefers reduced motion (the
  // crossfade itself just becomes a plain opacity fade in that case).
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [count])

  // Scroll-driven motion. The hero is `position: sticky`, so it stays pinned in
  // the viewport for roughly its own height of scrolling while the rounded page
  // body rises to cover it. We drive everything off raw window scroll over that
  // span:
  //   • the house cut-out scales up (zoom) from the bottom edge
  //   • the headline column translates up 1:1 with scroll — so it reads as
  //     normal page scrolling off the top, while the image stays put and zooms
  //     (the Glide hero effect).
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

  const imgScale = useTransform(scrollY, [0, span], [1, 1.55])
  const imgY = useTransform(scrollY, [0, span], ['0%', '-4%'])
  // Headline scrolls up at (almost) natural speed and fades out near the end.
  const textY = useTransform(scrollY, [0, span], [0, -span * 0.96])
  const textOpacity = useTransform(scrollY, [span * 0.55, span * 0.92], [1, 0])

  const textStyle = reduced ? undefined : { y: textY, opacity: textOpacity }
  const imgStyle = reduced
    ? undefined
    : { scale: imgScale, y: imgY, transformOrigin: 'center bottom' }

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
      className="sticky top-nav z-0 isolate flex min-h-[calc(100svh_-_var(--spacing-nav))] flex-col overflow-hidden bg-sand"
    >
      {/* Zooming house cut-out, anchored near the foot of the hero so it grows
          upward into the frame as you scroll. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[9vh] sm:bottom-[clamp(0px,2vh,40px)] -z-10"
        style={imgStyle}
        aria-hidden="true"
      >
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-x-0 bottom-0 flex justify-center"
            initial={{ opacity: 0, y: reduced ? 0 : '12%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : '-6%' }}
            transition={{
              opacity: { duration: CROSSFADE_S, ease: 'easeInOut' },
              y: { duration: 1, ease: EASE },
            }}
          >
            <picture>
              <source srcSet={heroImages[index].replace(/\.png$/, '.webp')} type="image/webp" />
              <img
                src={heroImages[index]}
                alt=""
                className="w-full max-w-[1700px] max-h-[56vh] object-contain object-bottom drop-shadow-[0_36px_60px_rgba(30,41,37,0.22)]"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Headline column — flex child so it never overlaps the foot band */}
      <motion.div
        style={textStyle}
        className="relative mx-auto mt-0 flex w-full max-w-[1360px] min-h-0 flex-1 flex-col items-center justify-start gap-6 px-5 pb-12 pt-[4vh] text-center sm:pt-0 lg:-mt-6 lg:px-12 lg:pb-16 lg:pt-0"
      >
        <motion.div
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate="show"
          className="flex flex-col items-center"
        >
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
          <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-6">
            <a href={hero.primaryCta.href} className="btn-pine group">
              {hero.primaryCta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 bg-gradient-to-b from-white/80 to-white/55 px-5 py-2.5 text-sm font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(30,41,37,0.14)] backdrop-blur-md transition-colors hover:text-clay"
            >
              {hero.secondaryCta.label}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
