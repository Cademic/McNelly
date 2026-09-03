import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { testimonials } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

const Quote = () => (
  <svg
    width="30"
    height="30"
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
    <figure className="flex h-full w-[270px] shrink-0 flex-col overflow-hidden border border-line bg-white/65 backdrop-blur-sm sm:w-[380px]">
      <picture>
        <source srcSet={webp(t.image)} type="image/webp" />
        <img
          src={t.image}
          alt={t.title || `Project completed for ${t.name}`}
          loading="lazy"
          className="h-[120px] w-full shrink-0 object-cover sm:h-[140px]"
          draggable={false}
        />
      </picture>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Quote />
        <blockquote className="mt-3 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-auto border-t border-line pt-4">
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

  // Three identical copies so the scroll position can wrap seamlessly in
  // either direction (native scroll can't go past 0, so we sit in the middle).
  const loop = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const unit = () => el.scrollWidth / 3

    // Snap back toward the middle copy whenever we drift a full copy-width
    // away from it — the copies are identical so the jump is invisible.
    const wrap = () => {
      const u = unit()
      if (u === 0) return
      if (el.scrollLeft > u * 1.5) el.scrollLeft -= u
      else if (el.scrollLeft < u * 0.5) el.scrollLeft += u
    }

    // Start reading position at the top of the middle copy.
    el.scrollLeft = unit()

    // Any finger / trackpad / wheel input hands control to the reader for a
    // beat before the drift resumes; hovering holds it until the pointer leaves.
    const hold = (ms: number) => {
      pausedUntil.current = Math.max(pausedUntil.current, performance.now() + ms)
    }
    const onWheel = () => hold(2000)
    const onTouch = () => hold(2000)
    const onPointerDown = () => hold(2000)
    const onScroll = () => wrap()
    const onEnter = () => {
      pausedUntil.current = Infinity
    }
    const onLeave = () => {
      pausedUntil.current = performance.now() + 1200
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('touchstart', onTouch, { passive: true })
    el.addEventListener('touchmove', onTouch, { passive: true })
    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    let raf = 0
    const SPEED = 0.4 // px per frame ≈ 24px/s
    const tick = () => {
      if (!reduced && performance.now() >= pausedUntil.current) {
        el.scrollLeft += SPEED
        wrap()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('touchmove', onTouch)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <section id="testimonials" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-clay">Testimonials</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
            What our clients say.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            ref={viewportRef}
            className="no-scrollbar relative mt-8 cursor-grab touch-pan-x overflow-x-auto overscroll-x-contain active:cursor-grabbing sm:mt-12"
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
                  className="flex pr-4 sm:pr-6"
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
