import { motion, useReducedMotion } from 'motion/react'
import { projects } from '../data/site'
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
                See our work in action
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

        <motion.div
          layout={!reduced}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.article
              key={p.name}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-white/50 transition-shadow duration-500 hover:shadow-[0_36px_70px_-30px_rgba(31,52,43,0.45)]"
            >
              <picture>
                <source srcSet={p.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.location}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </picture>

              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold tracking-wide text-pine backdrop-blur-sm">
                {p.year}
              </span>

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-pine-deep/90 via-pine-deep/30 to-transparent p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="eyebrow text-clay-soft">{p.category}</p>
                <h3 className="mt-2 font-display text-2xl font-medium text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-white/70">{p.location}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
