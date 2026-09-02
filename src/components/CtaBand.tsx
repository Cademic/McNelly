import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cta, mailtoConsult } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

export function CtaBand() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="scroll-mt-24 py-8">
      <div className="relative isolate overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          style={reduced ? undefined : { y: bgY }}
          aria-hidden="true"
        >
          <picture>
            <source srcSet={webp(cta.image)} type="image/webp" />
            <img
              src={cta.image}
              alt=""
              loading="lazy"
              className="h-full w-full scale-110 object-cover [filter:grayscale(1)_contrast(1.05)_brightness(0.92)]"
            />
          </picture>
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-pine-deep/60" aria-hidden="true" />

        <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-32">
          <div className="border border-white/25 p-8 text-center sm:p-14">
            <Reveal>
              <h2 className="mx-auto max-w-3xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-tight text-white">
                {cta.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/75">{cta.sub}</p>
              <a href={mailtoConsult} className="btn-pine mt-8 !bg-white !text-pine-deep hover:!bg-clay-soft">
                Book a Consultation
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
