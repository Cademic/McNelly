# McNelly Construction — Landing Page

Static marketing site for McNelly Construction, Inc. — a family-owned general
contractor in Southeast Michigan. Single page, no backend.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, tokens in `src/index.css` under `@theme`)
- **Motion** (`motion/react`) for the interactive hero, scroll reveals, filter transitions
- **oxlint** for linting
- Contact form posts to **Formspree** (no server required)
- Fonts: Hanken Grotesk (headings) + Source Serif 4 (body), Google Fonts via `index.html`

## Design system

Implements **"Architectural Integrity"** (see `DESIGN.md`): heritage forest green
(`#03271a`) with bronze accents, strictly sharp 0px corners, hairline dividers,
tonal layering instead of shadows, `label-caps` eyebrows, and Motion-driven scroll
reveals (`src/components/Reveal.tsx`) that slide up 20px / fade in once, fully
disabled under `prefers-reduced-motion`.

## Sections

`Navbar → Hero → Services → About → Projects → Contact → Footer` (`src/App.tsx`).
The hero (`src/components/Hero.tsx`) is a self-advancing featured-project carousel
with a thumbnail rail, prev/next, parallax background, and pause-on-hover/focus.

## Images

Full-res source photos live in `photos-src/` (git-ignored). Web-optimized WebP +
JPEG derivatives are committed in `public/photos/`. Regenerate with ImageMagick if
you add originals.

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
contact details, hours, service area, services, projects, commitments, and stats.
Components in `src/components/` render it.

**Project details are placeholders.** `projects[]` maps the real jobsite photos to
generic names/locations/years — replace `name`, `location`, and `year` (and adjust
`category` / `featured`) with the real project info. Add more entries by dropping a
`.jpg` + `.webp` pair into `public/photos/` and referencing it.

## Contact form setup

1. Create a free form at https://formspree.io.
2. Put the form ID in `site.formspreeId` in `src/data/site.ts`.

Until then the form UI works but submissions will fail.

## Deploy

Any static host. `npm run build` outputs `dist/`.

- **Cloudflare Pages / Netlify / Vercel**: connect the repo, build command
  `npm run build`, output directory `dist`.
