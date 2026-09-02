export const site = {
  company: 'McNelly Construction',
  legalName: 'McNelly Construction, Inc.',
  established: '1992',
  yearsExperience: '30+',
  tagline: 'Building Better Homes.',
  description:
    'A family-owned general contractor serving Southeast Michigan. From new construction to additions and whole-home renovations, we deliver quality craftsmanship and a better building experience.',
  phone: '(810) 654-0633',
  email: 'McNellyConstructionInc@gmail.com',
  address: {
    street: '13481 Henderson Rd.',
    locality: 'Otisville, MI 48463',
  },
  hours: 'Mon–Fri 7:00am – 5:00pm',
  serviceArea: 'Southeast Michigan',
  serviceTowns: ['Otisville', 'Davison', 'Grand Blanc', 'Fenton', 'Holly', 'Flint'],
  // Sign up at https://formspree.io (free) and paste your form ID here.
  formspreeId: 'YOUR_FORM_ID',
  licenseNote: 'Licensed & Insured',
} as const

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

// Hero copy — calm, plain-spoken, matched to the "Still Water" system.
export const hero = {
  eyebrow: 'Family-owned since 1992',
  headline: ['Turn Your Vision Into', 'a Home Built to Last'],
  sub: 'Custom homes, additions, and renovations across Southeast Michigan — framed by our own crews and finished with care.',
  primaryCta: { label: 'Start Your Project', href: '#contact' },
  secondaryCta: { label: 'See our work', href: '#projects' },
  note: 'A family general contractor turning careful plans into homes with a calm, considered approach to every detail.',
} as const

// Full-bleed hero background — quiet house photography, crossfaded.
export const heroImages = [
  '/photos/home-hilltop.jpg',
  '/photos/home-green-craftsman.jpg',
  '/photos/home-stone-chimney.jpg',
  '/photos/barn-drive.jpg',
] as const

// Big-number band at the foot of the hero.
export const heroStats = [
  { value: '30', suffix: '+ yrs', label: 'Building in SE Michigan' },
  { value: '1992', suffix: '', label: 'Family-owned since' },
  { value: '100', suffix: '%', label: 'Self-performed framing & finish' },
] as const

// Brand pillars from the design system — positioning, not metrics.
export const pillars = [
  { term: 'Veracity', detail: 'Built exactly as drawn and promised.' },
  { term: 'Family-Owned', detail: 'Same name, same standard, three decades on.' },
  { term: 'Experience', detail: '30+ years across Southeast Michigan.' },
  { term: 'Craftsmanship', detail: 'Framing and finish self-performed in-house.' },
] as const

export const services = [
  {
    index: '01',
    title: 'New Home Construction',
    body: 'Custom homes built around how you live — designed with you and framed by our own crews.',
  },
  {
    index: '02',
    title: 'Home Additions',
    body: 'More space and more function, tied seamlessly into the existing structure and rooflines.',
  },
  {
    index: '03',
    title: 'Kitchen & Bath Remodeling',
    body: 'Beautiful, functional spaces — layout, cabinetry, and finishes done right the first time.',
  },
  {
    index: '04',
    title: 'Whole-Home Renovations',
    body: 'Transform an entire home with one accountable team from first sketch to final walkthrough.',
  },
  {
    index: '05',
    title: 'Garages & Outbuildings',
    body: 'Detached garages, pole barns, and barndominiums built to match your home and your needs.',
  },
  {
    index: '06',
    title: 'Exterior Projects',
    body: 'Siding, decks, porches, roofing, and stonework that make a house look finished.',
  },
] as const

export const projectCategories = ['All', 'New Builds', 'Barndominiums', 'Renovations'] as const
export type ProjectCategory = (typeof projectCategories)[number]

// TODO: replace name / location / year with the real project details from the owner.
export const projects = [
  {
    name: 'Black Barndominium',
    location: 'Otisville, MI',
    year: '2023',
    category: 'Barndominiums',
    image: '/photos/barn-front.jpg',
    featured: true,
  },
  {
    name: 'Wooded Drive Build',
    location: 'Genesee County, MI',
    year: '2023',
    category: 'Barndominiums',
    image: '/photos/barn-drive.jpg',
    featured: true,
  },
  {
    name: 'Craftsman Ranch',
    location: 'Davison, MI',
    year: '2022',
    category: 'New Builds',
    image: '/photos/home-green-craftsman.jpg',
    featured: true,
  },
  {
    name: 'Two-Story Family Home',
    location: 'Grand Blanc, MI',
    year: '2022',
    category: 'New Builds',
    image: '/photos/home-stone-chimney.jpg',
    featured: true,
  },
  {
    name: 'Hilltop Walkout',
    location: 'Fenton, MI',
    year: '2021',
    category: 'New Builds',
    image: '/photos/home-hilltop.jpg',
    featured: false,
  },
  {
    name: 'Covered Porch Renovation',
    location: 'Holly, MI',
    year: '2021',
    category: 'Renovations',
    image: '/photos/home-grey-twostory.jpg',
    featured: false,
  },
] as const

export const commitments = [
  'A principal on site for every project',
  'Clear pricing and steady communication start to finish',
  'Framing, trim, and concrete performed in-house',
  'Family-owned and operated since the early 1990s',
] as const

export const stats = [
  { value: '30+', label: 'Years building in SE Michigan' },
  { value: '1992', label: 'Family-owned since' },
  { value: '100%', label: 'Self-performed framing & finish' },
] as const
