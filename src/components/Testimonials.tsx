import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { testimonials } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.(jpg|png)$/, '.webp')

const EASE = [0.16, 1, 0.3, 1] as const

const Arrow = ({ direction, size = 28 }: { direction: 'left' | 'right'; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={direction === 'left' ? 'rotate-180' : undefined}
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
)

type Testimonial = (typeof testimonials)[number]

function SlideContent({ t }: { t: Testimonial }) {
  return (
    <>
      <picture className="block w-full overflow-hidden">
        <source srcSet={webp(t.image)} type="image/webp" />
        <img
          src={t.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
          draggable={false}
        />
      </picture>

      <blockquote className="mt-6 max-w-[640px] whitespace-pre-line text-[13.5px] font-medium leading-relaxed text-black sm:mt-8 sm:text-base">
        “{t.quote}”
      </blockquote>

      <figcaption className="mt-6">
        <span className="block text-[12px] font-semibold text-black sm:text-sm">
          {t.name}
        </span>
        {t.title && (
          <span className="mt-0.5 block text-[11px] font-normal text-black/70 sm:text-xs">
            {t.title}
          </span>
        )}
      </figcaption>
    </>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const count = testimonials.length
  const [index, setIndex] = useState(0)
  const dirRef = useRef(1)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  // Measure the slide's own pixel width so the swipe can animate `left` in
  // px. We deliberately animate `left` (layout) instead of a transform —
  // GPU-compositing a transform on a large full-bleed image here left a
  // stale torn/striped raster artifact at the trailing edge after the
  // transition settled, clipped by the track's `overflow-hidden`.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setTrackWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (next: number) => {
      dirRef.current = next > index || (index === count - 1 && next === 0) ? 1 : -1
      setIndex(((next % count) + count) % count)
    },
    [count, index],
  )

  const t = testimonials[index]

  // Variant functions (rather than static initial/animate/exit objects) so
  // that when direction reverses mid-stream, the slide currently animating
  // out picks up the fresh direction too — AnimatePresence re-evaluates an
  // exiting child's variants using the `custom` value passed to
  // AnimatePresence itself (which is always current), not the value the
  // child captured back when it entered.
  const slideVariants = {
    enter: (dir: number) => (reduced ? { opacity: 0, left: 0 } : { left: dir * trackWidth, opacity: 1 }),
    center: { left: 0, opacity: 1 },
    exit: (dir: number) => (reduced ? { opacity: 0, left: 0 } : { left: dir * -trackWidth, opacity: 1 }),
  }

  return (
    <section id="testimonials" className="scroll-mt-24">
      <div className="mx-auto max-w-[1000px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-center text-clay">Testimonials</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-center font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
            What our clients say.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 sm:mt-16">
            <div ref={trackRef} className="group relative overflow-hidden">
              {/* Invisible sizer: every testimonial is stacked in the same grid
                  cell so the box is always as tall as the longest one — this
                  keeps the slideshow's footprint constant as slides change,
                  instead of the page reflowing on every transition. */}
              <div className="invisible px-6 py-10 sm:px-20 sm:py-14" aria-hidden="true">
                <div className="grid">
                  {testimonials.map((item) => (
                    <div
                      key={item.name}
                      className="col-start-1 row-start-1 flex w-full flex-col items-start text-left"
                    >
                      <SlideContent t={item} />
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence initial={false} custom={dirRef.current}>
                <motion.div
                  key={index}
                  custom={dirRef.current}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute top-0 flex h-full w-full flex-col items-start justify-center px-6 py-10 text-left sm:px-20 sm:py-14"
                >
                  <SlideContent t={t} />
                </motion.div>
              </AnimatePresence>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Previous testimonial"
                    className="absolute left-0 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center p-2 text-ink opacity-0 outline-none transition hover:text-clay focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-clay sm:left-2 sm:flex sm:group-hover:opacity-100"
                  >
                    <Arrow direction="left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Next testimonial"
                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center p-2 text-ink opacity-0 outline-none transition hover:text-clay focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-clay sm:right-2 sm:flex sm:group-hover:opacity-100"
                  >
                    <Arrow direction="right" />
                  </button>
                </>
              )}
            </div>

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex cursor-pointer items-center justify-center p-1 text-ink outline-none transition-colors hover:text-clay focus-visible:ring-2 focus-visible:ring-clay sm:hidden"
                >
                  <Arrow direction="left" size={18} />
                </button>

                <div className="flex items-center gap-2.5">
                  {testimonials.map((item, i) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show testimonial from ${item.name}`}
                      aria-current={i === index}
                      className={
                        'h-2 w-2 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-clay ' +
                        (i === index ? 'bg-clay' : 'bg-line hover:bg-clay-soft')
                      }
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next testimonial"
                  className="flex cursor-pointer items-center justify-center p-1 text-ink outline-none transition-colors hover:text-clay focus-visible:ring-2 focus-visible:ring-clay sm:hidden"
                >
                  <Arrow direction="right" size={18} />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
