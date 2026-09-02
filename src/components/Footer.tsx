import { nav, site } from '../data/site'

export function Footer() {
  return (
    <footer className="relative z-10 bg-pine-deep text-white">
      <div className="mx-auto max-w-[1360px] px-5 py-8 lg:px-12">
        <div className="grid gap-6 border-b border-white/15 pb-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center bg-clay font-sans text-sm font-extrabold text-white">
                M
              </span>
              <p className="font-sans text-sm font-extrabold uppercase leading-none tracking-tight sm:text-base">
                {site.company}
              </p>
            </div>
            <p className="mt-2.5 max-w-xs text-xs text-white/60">
              {site.legalName} — {site.address.street}, {site.address.locality}
            </p>
            <p className="mt-1 text-xs text-white/60">
              <a
                href={`tel:${site.phone.replace(/[^\d]/g, '')}`}
                className="hover:text-clay-soft"
              >
                {site.phone}
              </a>
              {' · '}
              <a href={`mailto:${site.email}`} className="hover:text-clay-soft">
                {site.email}
              </a>
            </p>
            <p className="mt-1 text-xs text-white/60">{site.hours}</p>
          </div>

          <div>
            <p className="eyebrow text-clay-soft">Explore</p>
            <nav className="mt-2.5 flex flex-col gap-1.5">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium text-white/70 transition-colors hover:text-clay-soft"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="eyebrow text-clay-soft">Service area</p>
            <p className="mt-2.5 text-xs leading-relaxed text-white/70">
              {site.serviceTowns.join(' · ')} and the surrounding {site.serviceArea}{' '}
              communities.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-4 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. Established{' '}
            {site.established}.
          </p>
          <p>{site.licenseNote} · Family-owned &amp; operated</p>
        </div>
      </div>
    </footer>
  )
}
