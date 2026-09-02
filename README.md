# McNelly Construction — Landing Page

Static marketing site for McNelly Construction, Inc. — a family-owned general
contractor in northeast Genesee County, Michigan. Single page, no backend.
Content follows the company brief in `Website Mock-up.pdf`.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, tokens in `src/index.css` under `@theme`)
- **Motion** (`motion/react`) for the interactive hero, scroll reveals, parallax
- **oxlint** for linting
- No backend — "Book a Consultation" opens a prefilled `mailto:` (see `mailtoConsult` in `src/data/site.ts`)
- Fonts: Hanken Grotesk (headings via `--font-sans`) + Fraunces (display), Google Fonts via `index.html`

## Design system

The implemented system is **"Still Water"** — tokens live in `src/index.css` under
`@theme`: a misty blue-to-sand fixed gradient ground, deep-pine ink, soft rounded
geometry, frosted-glass panels, clay accent used sparingly, and Motion-driven
scroll reveals (`src/components/Reveal.tsx`) that slide up 20px / fade in once,
fully disabled under `prefers-reduced-motion`. (`DESIGN.md` is an older, superseded
"Architectural Integrity" spec.)

## Sections

`Navbar → Hero → Services → Gallery → About → CtaBand → Testimonials → Contact →
Footer` (`src/App.tsx`), mapping to the pages of `Website Mock-up.pdf`. The hero
(`src/components/Hero.tsx`) is a self-advancing photo carousel with a parallax /
Ken-Burns background and pause-on-hover/focus.

## Images

Full-res source photos live in `photos-src/` (git-ignored). Web-optimized WebP +
JPEG derivatives (1800px wide) are committed in `public/photos/` and referenced
from `src/data/site.ts`.

To (re)generate derivatives, drop originals into `photos-src/` using the exact
filenames `site.ts` references, then run:

```bash
./scripts/optimize-photos.sh                 # all originals in photos-src/
./scripts/optimize-photos.sh service-commercial   # just one
```

The photos correlate to the pages of `Website Mock-up.pdf` (originals in
`photos-src/<name>.png`):

| Filename `<name>` | PDF page | Used by |
| --- | --- | --- |
| `service-general-construction` | p3 · General Construction | Services card 01 |
| `service-commercial` | p3 · Commercial | Services card 02 + Gallery |
| `service-design-build` | p3 · Design Build | Services card 03 |
| `gallery-foundation` | p4 · Gallery | Gallery |
| `gallery-framing-truck` | p4 · Gallery | Gallery |
| `gallery-craftsman-winter` | p4 · Gallery | Gallery + Hero |
| `cta-framing-bw` | p6 · CTA | CtaBand background (rendered B&W) |
| `testimonial-childs-vet` | p7 · Cindy Childs | Testimonials (featured) |
| `testimonial-church-interior` | p8 · Jeffrey Ferweda | Testimonials |
| `barndominium` | p9 · Jeff Berlin | Testimonials + Gallery + Hero |

## Scripts

```bash
npm install      # install deps
npm run dev      # local dev server with HMR
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Editing content

Almost all copy lives in [`src/data/site.ts`](src/data/site.ts) — company name,
contact details, social links, service area, services, gallery items, commitments,
testimonials, and the mid-page CTA. Components in `src/components/` render it.

**Gallery details are illustrative.** `projects[]` maps the real jobsite photos to
generic names/locations/years — replace `name`, `location`, `year`, and `category`
with the real project info. Add more entries by dropping a `.jpg` + `.webp` pair
into `public/photos/` and referencing it. Testimonials in `testimonials[]` are
verbatim from the company brief.

## Deploy

Any static host. `npm run build` outputs `dist/`.

- **Cloudflare Pages / Netlify / Vercel**: connect the repo, build command
  `npm run build`, output directory `dist`.
