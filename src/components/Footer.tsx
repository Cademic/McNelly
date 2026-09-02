import { nav, site } from '../data/site'

export function Footer() {
  return (
    <footer className="relative z-10 bg-pine-deep text-white">
      <div className="mx-auto max-w-[1360px] px-5 py-5 lg:px-12">
        <div className="flex flex-col gap-4 border-b border-white/15 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <img
              src="/logo-full-light.png"
              alt={`${site.company} logo`}
              className="h-8 w-auto"
            />
            <p className="text-xs text-white/60">
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
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-1.5">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-white/70 transition-colors hover:text-clay-soft"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-white/70 transition-colors hover:text-clay-soft"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-white/70 transition-colors hover:text-clay-soft"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-1 pt-3 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName} —{' '}
            {site.address.street}, {site.address.locality}
          </p>
          <p>Family-owned &amp; operated</p>
        </div>
      </div>
    </footer>
  )
}
