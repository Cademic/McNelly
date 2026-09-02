import { testimonials } from '../data/site'
import { Reveal } from './Reveal'

const webp = (src: string) => src.replace(/\.jpg$/, '.webp')

const Quote = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-clay-soft"
    aria-hidden="true"
  >
    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.5-4.3L9.5 6zm9 0c-3 1.5-4.5 4-4.5 7v5h6v-6h-3c0-2 .8-3.4 2.5-4.3L18.5 6z" />
  </svg>
)

export function Testimonials() {
  const [featured, ...rest] = testimonials

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
          <figure className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-line bg-white/65 backdrop-blur-sm md:grid-cols-2">
            <div className="relative min-h-[260px]">
              <picture>
                <source srcSet={webp(featured.image)} type="image/webp" />
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </div>
            <div className="flex flex-col p-8 sm:p-12">
              <Quote />
              <blockquote className="mt-5 font-display text-lg font-medium leading-relaxed text-ink sm:text-xl">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-line pt-5">
                <span className="block font-semibold text-ink">{featured.name}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{featured.title}</span>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={120 + i * 90}>
              <figure className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white/60 backdrop-blur-sm">
                <picture>
                  <source srcSet={webp(t.image)} type="image/webp" />
                  <img
                    src={t.image}
                    alt={t.title || `Project completed for ${t.name}`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </picture>
                <div className="flex flex-1 flex-col p-8">
                  <Quote />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <span className="block font-semibold text-ink">{t.name}</span>
                    {t.title && (
                      <span className="mt-0.5 block text-sm text-ink-soft">{t.title}</span>
                    )}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
