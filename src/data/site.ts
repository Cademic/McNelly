export const site = {
  company: 'McNelly Construction',
  legalName: 'McNelly Construction, Inc.',
  tagline: 'Let us make your dream a reality.',
  description:
    'At McNelly Construction, we take pride in delivering superior construction services. With our skilled team and commitment to excellence, we are dedicated to bringing your construction projects to life. Located in northeast Genesee County, we serve our local community and the surrounding areas.',
  phone: '(810) 444-7167',
  email: 'McNellyConstructionInc@gmail.com',
  address: {
    street: '13481 Henderson Rd.',
    locality: 'Otisville, MI 48463',
  },
  serviceArea: 'northeast Genesee County',
  serviceAreaLong: 'northeast Genesee County and the surrounding areas',
  social: {
    facebook: 'https://www.facebook.com/mcnellyconstruction',
    instagram: 'https://www.instagram.com/mcnellyconstruction/',
  },
} as const

export const mailtoConsult = `mailto:${site.email}?subject=${encodeURIComponent(
  'Consultation request',
)}&body=${encodeURIComponent(
  "Hi McNelly Construction,\n\nI'd like to book a consultation. Here are a few details about my project:\n\n- Project type:\n- Location:\n- Timeline:\n- Notes:\n\nThanks,\n",
)}`

// Scroll-spy nav links. "Book a Consultation" is rendered separately as a
// mailto button (see Navbar / Footer), matching the four-item brief nav.
export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
] as const

// Hero copy — pulled straight from the company brief.
export const hero = {
  eyebrow: 'Family-owned general contractor',
  headline: ['Let Us Make Your', 'Dream a Reality'],
  sub: 'We take pride in delivering superior construction services. With a skilled team and a commitment to excellence, we bring your construction projects to life.',
  primaryCta: { label: 'Book a Consultation', href: mailtoConsult },
  secondaryCta: { label: 'See our work', href: '#gallery' },
  note: 'Located in northeast Genesee County, serving our local community and the surrounding areas. Book a consultation with us today.',
} as const

// Full-bleed hero background — finished-home photography, crossfaded slowly.
// Mix of the original site photos and the owner's newer batch.
export const heroImages = [
  '/photos/home-hilltop.jpg',
  '/photos/gallery-craftsman-winter.jpg',
  '/photos/home-green-craftsman.jpg',
  '/photos/barndominium.jpg',
  '/photos/home-stone-chimney.jpg',
  '/photos/home-green-ranch.jpg',
] as const

// Foot-of-hero band — what we do, no invented metrics.
export const heroStats = [
  { value: 'Residential', suffix: '', label: 'Custom homes & design build' },
  { value: 'Commercial', suffix: '', label: 'Offices, churches, clinics & more' },
  { value: 'Local', suffix: '', label: 'Rooted in northeast Genesee County' },
] as const

export const services = [
  {
    index: '01',
    title: 'General Construction',
    body: 'Planning a new building, addition, or renovation? We help you navigate design and construction options to protect your investment, ensure quality, and streamline the process.',
    image: '/photos/service-general-construction.jpg',
  },
  {
    index: '02',
    title: 'Commercial',
    body: 'Specialized construction services for commercial and larger projects — office spaces, churches, clinics, and more — delivering efficient, high-quality results while keeping a residential-friendly approach.',
    image: '/photos/service-commercial.jpg',
  },
  {
    index: '03',
    title: 'Design Build',
    body: 'Design build helps you create your dream home. With years of experience, we guide you through every step of the process.',
    image: '/photos/service-design-build.jpg',
  },
] as const

// Gallery — real jobsite photos from the company. Names/locations/years are
// illustrative and can be replaced with the true project details from the owner.
export const projects = [
  {
    name: 'Poured Foundation',
    location: 'Genesee County, MI',
    year: '2024',
    category: 'In Progress',
    image: '/photos/gallery-foundation.jpg',
  },
  {
    name: 'Ranch Under Frame',
    location: 'Otisville, MI',
    year: '2024',
    category: 'In Progress',
    image: '/photos/gallery-framing-truck.jpg',
  },
  {
    name: 'Craftsman Ranch',
    location: 'Genesee County, MI',
    year: '2023',
    category: 'New Build',
    image: '/photos/gallery-craftsman-winter.jpg',
  },
  {
    name: 'Custom Barndominium',
    location: 'Genesee County, MI',
    year: '2023',
    category: 'Design Build',
    image: '/photos/barndominium.jpg',
  },
  {
    name: 'Commercial Build',
    location: 'Genesee County, MI',
    year: '2022',
    category: 'Commercial',
    image: '/photos/service-commercial.jpg',
  },
  {
    name: 'Two-Story Family Home',
    location: 'Grand Blanc, MI',
    year: '2022',
    category: 'New Build',
    image: '/photos/home-stone-chimney.jpg',
  },
  {
    name: 'Craftsman Front Porch',
    location: 'Davison, MI',
    year: '2022',
    category: 'New Build',
    image: '/photos/home-green-craftsman.jpg',
  },
  {
    name: 'Hilltop Walkout',
    location: 'Fenton, MI',
    year: '2021',
    category: 'New Build',
    image: '/photos/home-hilltop.jpg',
  },
  {
    name: 'Wooded Drive Barndominium',
    location: 'Genesee County, MI',
    year: '2021',
    category: 'Design Build',
    image: '/photos/barn-drive.jpg',
  },
  {
    name: 'Covered Porch Renovation',
    location: 'Holly, MI',
    year: '2021',
    category: 'Renovation',
    image: '/photos/home-grey-twostory.jpg',
  },
] as const

// About / "Our Commitment to Excellence" — from the company brief.
export const commitments = [
  'An experienced team of designers, builders, trades, and project managers',
  'A seamless process from concept to completion',
  'A focus on precision, quality, and client satisfaction',
  'Family-owned and operated',
] as const

// About tiles — brand qualities, not metrics.
export const stats = [
  { value: 'Precision', label: 'Every detail measured and executed' },
  { value: 'Quality', label: 'Materials and workmanship built to last' },
  { value: 'Satisfaction', label: 'Your goals guide every decision' },
] as const

// Client testimonials — verbatim from the company brief. Each image is the
// project referenced in that person's quote.
export const testimonials = [
  {
    quote:
      'I have been lucky enough to work with McNelly Construction twice. They built our veterinary clinic in Davison and rebuilt our deck and outside wall after a fire at our home. I grew up working around my dad in the building field. I worked in a window company and dealt with builders for a few years. McNelly Construction is the most honest, capable builder I ever dealt with. They always find a way to make things happen and stand by their work. I have confidently referred McNelly Construction for many projects. They have never let me down.',
    name: 'Cindy Childs',
    title: 'Co-owner of Childs Veterinary Clinic — Davison, MI',
    image: '/photos/testimonial-childs-vet.jpg',
    featured: true,
  },
  {
    quote:
      'I have worked with McNelly Construction since 2001 and am proud to call them friends. They bring impeccable integrity to everything they do and consistently provide fair, transparent pricing. Every project is approached as an opportunity to deliver exceptional value while sharing the depth of experience they bring to their clients.',
    name: 'Jeffrey Ferweda',
    title: 'Sedgwick & Ferweda Architects',
    image: '/photos/testimonial-church-interior.jpg',
    featured: false,
  },
  {
    quote:
      'McNelly Construction has been a fantastic partner on our custom-built barn-dominium; combining craftsmanship, reliability, and clear communication from start to finish. I’d highly recommend their team to anyone looking for a builder who truly takes pride in their work and delivers on their promises.',
    name: 'Jeff Berlin',
    title: '',
    image: '/photos/barndominium.jpg',
    featured: false,
  },
] as const

// Mid-page call-to-action band.
export const cta = {
  heading: 'Ready to get started? Book a consultation with us today.',
  sub: 'Tell us about your project and we’ll help you take the first step.',
  image: '/photos/cta-framing-bw.jpg',
} as const
