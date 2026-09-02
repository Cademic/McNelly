import type { ReactNode } from 'react'
import { site } from '../data/site'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pb-16 lg:pb-24">
      <Reveal>
        <div className="grid overflow-hidden border-y border-line bg-white/60 backdrop-blur-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-pine px-5 py-8 text-white sm:px-8 lg:px-10">
            <div className="ml-auto max-w-xl lg:max-w-lg">
              <p className="eyebrow text-clay-soft">Contact</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium leading-tight text-white">
                Ready to start your project?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Send us an email with a few details. We respond within one
                business day with next steps and a timeline.
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                <ContactRow label="Phone">
                  <a
                    href={`tel:${site.phone.replace(/[^\d]/g, '')}`}
                    className="hover:text-clay-soft"
                  >
                    {site.phone}
                  </a>
                </ContactRow>
                <ContactRow label="Hours">{site.hours}</ContactRow>
                <ContactRow label="Office">
                  {site.address.street}
                  <br />
                  {site.address.locality}
                </ContactRow>
                <ContactRow label="Service area">
                  <span className="text-white/85">{site.serviceTowns.join(' · ')}</span>
                </ContactRow>
              </dl>
            </div>
          </div>

          <div className="flex w-full max-w-2xl flex-col items-start justify-center gap-3 px-5 py-8 sm:px-8 lg:px-10">
            <p className="eyebrow text-ink-soft">Email us</p>
            <a href={`mailto:${site.email}`} className="btn-pine">
              {site.email}
            </a>
            <p className="text-sm text-ink-mute">Prefer to talk? Call {site.phone}.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="eyebrow text-clay-soft">{label}</dt>
      <dd className="mt-1 text-base text-white">{children}</dd>
    </div>
  )
}
