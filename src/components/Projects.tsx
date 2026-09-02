import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { projectCategories, projects, type ProjectCategory } from '../data/site'
import { Reveal } from './Reveal'

const EASE = [0.16, 1, 0.3, 1] as const

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('All')
  const reduced = useReducedMotion()

  const visible = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-clay">Our work</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
              Selected projects
            </h2>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
            >
              Start your project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'border-pine bg-pine text-white'
                    : 'border-line text-ink-soft hover:border-clay hover:text-clay'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout={!reduced}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.name}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
