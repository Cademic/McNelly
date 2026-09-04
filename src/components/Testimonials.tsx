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
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-[14px] w-[14px] text-clay-soft sm:h-6 sm:w-6"
    aria-hidden="true"
  >
    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.5-4.3L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7v5h6v-6h-3c0-2 .8-3.4 2.5-4.3L18.5 6z" />
  </svg>
)

type Testimonial = (typeof testimonials)[number]

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex w-auto min-w-[104px] shrink-0 flex-col overflow-hidden border border-line">
      {/* The photo sits behind the whole card. */}
      <picture>
        <source srcSet={webp(t.image)} type="image/webp" />
        <img
          src={t.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </picture>
      {/* Wash over the photo to keep the text readable. No backdrop-blur: it
          repaints every scroll frame on mobile and flashes white. */}
      <div className="absolute inset-0 bg-white/50" />

      <div className="relative flex flex-1 flex-col p-2.5 sm:p-5">
        <Quote />
        {/* Width follows the text: short quotes size to a single line, longer
            ones grow wider up to the max measure before they wrap. */}
        <blockquote className="mt-1 w-max max-w-[230px] text-[10px] font-medium leading-snug text-black sm:mt-2.5 sm:max-w-[340px] sm:text-[13.5px] sm:leading-relaxed">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-auto max-w-[230px] border-t border-white/40 pt-2 sm:max-w-[340px] sm:pt-4">
          <span className="block text-[11px] font-bold text-black sm:text-base">
            {t.name}
          </span>
          {t.title && (
            <span className="block text-[10px] font-medium text-black sm:mt-0.5 sm:text-sm">
              {t.title}
            </span>
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
    // the whole value every frame while the drift owns the track.
    let pos = unit()
    el.scrollLeft = pos
    // Last value *we* wrote — lets the loop tell its own writes apart from the
    // browser moving the scroll (finger drag, trackpad, fling momentum).
    let lastLeft = Math.round(el.scrollLeft)

    // Snap back toward the middle copy near either edge — the three copies are
    // identical so the jump is invisible, which makes the scroll feel endless.
    // Writes el.scrollLeft ONLY when it actually wraps: touching it every frame
    // kills native momentum on mobile.
    const wrap = () => {
      const u = unit()
      if (u === 0) return
      if (pos > u * 1.5) pos -= u
      else if (pos < u * 0.5) pos += u
      else return
      el.scrollLeft = pos
    }

    const hold = (ms: number) => {
      pausedUntil.current = Math.max(pausedUntil.current, performance.now() + ms)
    }

    // Mouse drag-to-pan state. Touch is left to the browser's native scrolling
    // so a finger can still swipe the page up and down while flicking the row.
    let drag = false
    let startX = 0
    let startScroll = 0

    // Mouse: hover holds the drift; leaving resumes it right away.
    const onEnter = () => {
      pausedUntil.current = Infinity
    }
    const onLeave = () => {
      drag = false
      pausedUntil.current = 0
    }

    // Trackpad / wheel: native horizontal scroll does the work, we just pause.
    const onWheel = () => hold(1800)

    // Touch: let the browser scroll the row natively (so a finger can still
    // swipe the page up/down too). Freeze the drift while a finger is down and
    // for a couple of seconds after it lifts.
    const onTouchStart = () => {
      pausedUntil.current = Infinity
    }
    const onTouchMove = () => {
      pausedUntil.current = Infinity
    }
    const onTouchEnd = () => {
      pausedUntil.current = performance.now() + 2500
    }

    // Mouse drag-to-pan (pointer events are mouse-only here).
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      drag = true
      startX = e.clientX
      startScroll = el.scrollLeft
      el.setPointerCapture?.(e.pointerId)
      pausedUntil.current = Infinity
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!drag || e.pointerType !== 'mouse') return
      el.scrollLeft = startScroll - (e.clientX - startX)
      pos = el.scrollLeft
    }
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !drag) return
      drag = false
      el.releasePointerCapture?.(e.pointerId)
      pos = el.scrollLeft
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    let raf = 0
    const SPEED = 0.4 // px per frame ≈ 24px/s
    const tick = () => {
      const u = unit()
      if (u > 0) {
        // Browser moved the scroll since our last write — finger drag, trackpad,
        // or leftover fling momentum. Yield: follow it, hold the drift until it
        // settles, and don't write scrollLeft (that's what caused the stutter).
        const nativelyMoved = Math.abs(el.scrollLeft - lastLeft) > 2

        if (nativelyMoved) {
          pos = el.scrollLeft
          pausedUntil.current = Math.max(
            pausedUntil.current,
            performance.now() + 1000,
          )
          wrap()
        } else if (nudge.current !== 0) {
          // Arrow jump — always honored, even mid-pause.
          const eat =
            reduced || Math.abs(nudge.current) < 1
              ? nudge.current
              : nudge.current * 0.18
          pos += eat
          nudge.current -= eat
          wrap()
          el.scrollLeft = pos
        } else if (!reduced && performance.now() >= pausedUntil.current) {
          pos += SPEED
          wrap()
          el.scrollLeft = pos
        } else {
          // Paused and still — stay synced so the drift resumes from here.
          pos = el.scrollLeft
          wrap()
        }

        lastLeft = Math.round(el.scrollLeft)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
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
          <div className="relative mt-5 sm:mt-12">
            <div
              ref={viewportRef}
              className="no-scrollbar cursor-grab select-none overflow-x-auto overscroll-x-contain active:cursor-grabbing"
            >
              <ul className="flex w-max items-start">
                {loop.map((t, i) => (
                  <li
                    key={`${t.name}-${i}`}
                    aria-hidden={i >= testimonials.length}
                    className="flex pr-2 sm:pr-6"
                  >
                    <Card t={t} />
                  </li>
                ))}
              </ul>
            </div>
            {/* Edge fades — plain overlays instead of mask-image, which forces a
                full re-raster of the scroller every frame on mobile (white flash). */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-sand to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-sand to-transparent sm:w-16" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10">
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
        </Reveal>
      </div>
    </section>
  )
}
