import type { ReactElement } from 'react'
import { services } from '../data/site'
import { Reveal } from './Reveal'

// Minimal line glyphs, keyed by service index.
const glyphs: Record<string, ReactElement> = {
  '01': <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" />,
  '02': <path d="M3 20V6h10v14M13 12h8v8M6 10h4M6 14h4" />,
  '03': <path d="M4 10h16M7 10V6h10v4M9 14h.01M15 14h.01M6 20v-6h12v6" />,
  '04': <path d="M3 20l9-16 9 16M8 20v-5h8v5M12 4v4" />,
  '05': <path d="M3 20v-9l9-5 9 5v9M3 20h18M8 20v-5h8v5" />,
  '06': <path d="M4 20V8l8-4 8 4v12M4 12h16M12 4v16" />,
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-[1360px] px-5 py-24 lg:px-12 lg:py-[120px]">
        <Reveal>
          <p className="eyebrow text-clay">What we build</p>
          <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-ink">
              General construction, self-performed where it counts.
            </h2>
            <p className="max-w-sm text-base text-ink-soft">
              Our own crews handle framing, trim, and concrete. A vetted trade
              network covers the rest — so the schedule holds either way.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <article className="group h-full rounded-[1.75rem] border border-line bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-white/85 hover:shadow-[0_30px_60px_-30px_rgba(31,52,43,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-ink-mute transition-colors group-hover:text-clay">
                    {s.index}
                  </span>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pine-soft transition-colors duration-300 group-hover:text-pine"
                    aria-hidden="true"
                  >
                    {glyphs[s.index]}
                  </svg>
                </div>
                <h3 className="marker-dot mt-6 font-display text-xl font-medium text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
