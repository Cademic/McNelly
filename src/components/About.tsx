import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { commitments, site, stats } from '../data/site'
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
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-white">
              Our commitment to excellence.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-white/80">
              We are dedicated to delivering outstanding carpentry services that
              exceed client expectations. Our experienced team of designers,
              builders, trades, and project managers work together to ensure a
              seamless renovation from concept to completion — focusing on
              precision, quality, and client satisfaction.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {site.legalName} is a family-owned general contractor rooted in
              northeast Genesee County. When you call, you speak with the people
              running your build.
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
                    <CountUp value={s.value} disabled={!!reduced} />
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

/** Animates the leading integer of `value` from 0 on first view, keeping any prefix/suffix. */
function CountUp({ value, disabled }: { value: string; disabled: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const parts = useMemo(() => {
    const m = value.match(/^(\D*)(\d+)(.*)$/)
    return m ? { prefix: m[1], target: Number(m[2]), suffix: m[3] } : null
  }, [value])
  const [display, setDisplay] = useState(
    disabled || !parts ? value : `${parts.prefix}0${parts.suffix}`,
  )

  useEffect(() => {
    if (disabled || !parts || !inView) return
    const { prefix, target, suffix } = parts
    const duration = 1100
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, disabled, parts])

  return <span ref={ref}>{display}</span>
}
