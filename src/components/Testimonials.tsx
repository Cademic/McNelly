import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { testimonials } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={
      'transition-transform duration-300 ease-out ' +
      (dir === 'left'
        ? 'group-hover:-translate-x-0.5'
        : 'group-hover:translate-x-0.5')
    }
  >
    <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
  </svg>
)

const Quote = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-clay-soft"
    aria-hidden="true"
  >
    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.5-4.3L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7v5h6v-6h-3c0-2 .8-3.4 2.5-4.3L18.5 6z" />
  </svg>
)

type Testimonial = (typeof testimonials)[number]

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-auto min-w-[180px] shrink-0 flex-col overflow-hidden border border-line bg-white/65 backdrop-blur-sm">
      <picture>
        <source srcSet={webp(t.image)} type="image/webp" />
        <img
          src={t.image}
          alt={t.title || `Project completed for ${t.name}`}
          loading="lazy"
          className="h-[84px] w-full shrink-0 object-cover sm:h-[110px]"
          draggable={false}
        />
      </picture>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Quote />
        {/* Width follows the text: short quotes make a narrow card, long ones
            wrap only once they hit the max measure. */}
        <blockquote className="mt-2 w-max max-w-[240px] text-[12.5px] leading-relaxed text-ink-soft sm:mt-2.5 sm:max-w-[340px] sm:text-[13.5px]">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-auto max-w-[240px] border-t border-line pt-3 sm:max-w-[340px] sm:pt-4">
          <span className="block font-semibold text-ink">{t.name}</span>
          {t.title && (
            <span className="mt-0.5 block text-sm text-ink-soft">{t.title}</span>
          )}
        </figcaption>
      </div>
    </figure>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  // While > now, the auto-advance is paused (user is interacting).
  const pausedUntil = useRef(0)
  // Pixels the arrow controls still owe the track; the rAF loop eases this to 0.
  const nudge = useRef(0)

  // Three identical copies so the scroll position can wrap seamlessly in
  // either direction (native scroll can't go past 0, so we sit in the middle).
  const loop = [...testimonials, ...testimonials, ...testimonials]

  // Arrow controls: queue a one-card jump and hold the auto-drift for a beat so
  // it doesn't fight the reader.
  const step = (dir: 1 | -1) => {
    const el = viewportRef.current
    if (!el) return
    const card = el.querySelector('li')?.getBoundingClientRect().width
    const by = card && card > 0 ? card : el.clientWidth * 0.8
    nudge.current += dir * by
    pausedUntil.current = performance.now() + 2500
  }

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const unit = () => el.scrollWidth / 3

    // Own accumulator: mobile browsers round el.scrollLeft to an integer, so
    // `scrollLeft += 0.4` never budges. Track the true position in JS and write
    // the whole value every frame instead.
    let pos = unit()
    el.scrollLeft = pos

    // Hovering holds the drift until the pointer leaves.
    const onEnter = () => {
      pausedUntil.current = Infinity
    }
    const onLeave = () => {
      pausedUntil.current = 0
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    let raf = 0
    const SPEED = 0.4 // px per frame ≈ 24px/s
    const tick = () => {
      const u = unit()
      if (u > 0) {
        if (!reduced && performance.now() >= pausedUntil.current) pos += SPEED
        if (nudge.current !== 0) {
          const eat =
            reduced || Math.abs(nudge.current) < 1
              ? nudge.current
              : nudge.current * 0.18
          pos += eat
          nudge.current -= eat
        }
        // Stay parked on the middle copy so it can drift either way forever —
        // the copies are identical so the wrap is invisible.
        if (pos >= u * 2) pos -= u
        else if (pos < u) pos += u
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <section id="testimonials" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-clay">Testimonials</p>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
                What our clients say.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous testimonials"
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink outline-none transition-[color,background-color,border-color,transform] duration-300 ease-out hover:scale-110 hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-clay"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next testimonials"
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink outline-none transition-[color,background-color,border-color,transform] duration-300 ease-out hover:scale-110 hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-clay"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            ref={viewportRef}
            className="no-scrollbar relative mt-8 overflow-x-hidden sm:mt-12"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            }}
          >
            <ul className="flex w-max items-stretch">
              {loop.map((t, i) => (
                <li
                  key={`${t.name}-${i}`}
                  aria-hidden={i >= testimonials.length}
                  className="flex pr-3 sm:pr-6"
                >
                  <Card t={t} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
