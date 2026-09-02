import { services } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

export function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-clay">What we do</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink sm:whitespace-nowrap">
              Expert construction &amp; solutions.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col overflow-hidden border border-line bg-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-white/85 hover:shadow-[0_30px_60px_-30px_rgba(31,52,43,0.35)]">
                <picture>
                  <source srcSet={webp(s.image)} type="image/webp" />
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="flex flex-1 flex-col p-8">
                  <span className="font-display text-lg text-ink-mute transition-colors group-hover:text-clay">
                    {s.index}
                  </span>
                  <h3 className="marker-dot mt-3 font-display text-xl font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
