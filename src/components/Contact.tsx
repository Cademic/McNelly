import { site } from '../data/site'
import { Reveal } from './Reveal'

export function Contact() {
  const mapQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.locality}`,
  )

  return (
    <section id="contact" className="scroll-mt-24 border-b border-white/15 bg-pine-deep text-white">
      <div className="mx-auto max-w-[1360px] px-5 py-20 lg:px-12 lg:py-28">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            {/* The pitch + primary action */}
            <div className="max-w-2xl">
              <p className="eyebrow text-clay-soft">Book a Consultation</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.7vw,2.1rem)] font-medium leading-tight text-white lg:whitespace-nowrap">
                Ready to make your dream a reality?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Send us an email with a few details about your project and we’ll
                be in touch to set up a consultation.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="btn-pine mt-8 !bg-white !text-pine-deep hover:!bg-clay-soft"
              >
                {site.email}
              </a>
              <p className="mt-4 text-sm text-white/60">
                Prefer to talk? Call{' '}
                <a
                  href={`tel:${site.phone.replace(/[^\d]/g, '')}`}
                  className="text-white underline-offset-4 hover:text-clay-soft hover:underline"
                >
                  {site.phone}
                </a>
                .
              </p>
            </div>

            {/* The map */}
            <div className="self-center border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
              <div className="overflow-hidden rounded-xl border border-white/15">
                <iframe
                  title={`Map showing ${site.company} at ${site.address.street}, ${site.address.locality}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-56 w-full"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-clay-soft transition-colors hover:text-white"
              >
                {site.address.street}, {site.address.locality}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
