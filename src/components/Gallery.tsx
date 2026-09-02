import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { buildSteps } from '../data/site'
import { Reveal } from './Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export function Gallery() {
  const reduced = useReducedMotion()

  return (
    <section id="gallery" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-clay">Our work</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
                See Our Work in Action
              </h2>
              <p className="mt-3 max-w-md text-base text-ink-soft">
                We take pride in every project we complete.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
            >
              Book a consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row lg:gap-3">
          {buildSteps.map((s, i) => (
            <Fragment key={s.step}>
              <motion.article
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
                className="group relative flex-1 overflow-hidden border border-line bg-white/50 transition-shadow duration-500 hover:shadow-[0_36px_70px_-30px_rgba(31,52,43,0.45)]"
              >
                <picture>
                  <source srcSet={s.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-deep/90 via-pine-deep/40 to-transparent p-6 pt-12">
                  <h3 className="font-display text-2xl font-medium text-white">
                    {s.step}
                  </h3>
                </div>
              </motion.article>

              {i < buildSteps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex flex-none items-center justify-center self-center text-clay"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 rotate-90 lg:rotate-0"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
