import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { commitments, stats } from '../data/site'
import { Reveal } from './Reveal'

export function About() {
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <section id="about" className="scroll-mt-24 pb-8">
      <div className="overflow-hidden bg-pine text-white">
        <div className="mx-auto grid max-w-[1360px] gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-24">
          <Reveal>
            <p className="eyebrow text-clay-soft">The firm</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-white sm:whitespace-nowrap">
              Our commitment to excellence.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-white/80">
              At McNelly Construction, we take pride in delivering superior
              construction services. With our skilled team and commitment to
              excellence, we are dedicated to bringing your construction projects
              to life.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Located in northeast Genesee County, we serve our local community
              and the surrounding areas. Let us make your dream a reality. Book a
              consultation with us today.
            </p>

            <ul className="mt-10 border-t border-white/15">
              {commitments.map((c) => (
                <li
                  key={c}
                  className="marker-dot border-b border-white/15 py-4 text-[15px] text-white/85"
                >
                  {c}
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/10 px-4 py-5">
                  <dt className="font-display text-lg font-medium tracking-tight text-white sm:text-xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 text-xs leading-snug text-white/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div
              ref={imgWrapRef}
              className="overflow-hidden border border-white/10"
            >
              <motion.div style={reduced ? undefined : { y: imgY }}>
                <picture>
                  <source srcSet="/photos/detail-stone.webp" type="image/webp" />
                  <img
                    src="/photos/detail-stone.jpg"
                    alt="Stacked-stone corner detail with black windows on a McNelly custom home"
                    loading="lazy"
                    className="aspect-[4/3] w-full scale-110 object-cover"
                  />
                </picture>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
