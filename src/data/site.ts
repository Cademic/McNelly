export const site = {
  company: 'McNelly Construction',
  legalName: 'McNelly Construction, Inc.',
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

// Every "Book a Consultation" button scrolls to the Contact section.
export const contactHref = '#contact'

// Scroll-spy nav links, in page order. "Book a Consultation" is rendered
// separately as a button that also jumps to #contact (see Navbar / Footer).
export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

// Hero copy — pulled straight from the company brief.
export const hero = {
  eyebrow: 'Family-owned general contractor',
  headline: ['Let Us Make Your', 'Dream a Reality'],
  sub: 'We take pride in delivering superior construction services. With a skilled team and a commitment to excellence, we bring your construction projects to life.',
  primaryCta: { label: 'Book a Consultation', href: contactHref },
  secondaryCta: { label: 'See our work', href: '#gallery' },
} as const

// Hero cut-outs — transparent PNGs of finished + in-progress homes. They sit
// on a calm backdrop and scale up as the pinned hero is scrolled past, while
// the headline scrolls up the page at natural speed (Glide-style).
export const heroImages: ReadonlyArray<{ src: string; scale?: number }> = [
  { src: '/photos/hero-navy-farmhouse.png' },
  { src: '/photos/hero-green-ranch.png' },
  { src: '/photos/hero-black-barn.png' },
  { src: '/photos/hero-navy-ranch.png', scale: 1.35 },
]

export const services = [
  {
    index: '01',
    title: 'General Construction',
    body: 'Planning a new building, addition, or renovation? Let us help you navigate design and construction options to protect your investment, ensure quality, and streamline the process.',
    image: '/photos/service-general-construction.jpg',
  },
  {
    index: '02',
    title: 'Commercial',
    body: 'We offer specialized construction services for commercial or larger projects such as office spaces, churches, clinics, and more, delivering efficient and high-quality results while maintaining a residential-friendly approach.',
    image: '/photos/service-commercial.jpg',
  },
  {
    index: '03',
    title: 'Design Build',
    body: 'Design build helps you create your dream home. With years of experience, we guide you through every step of the process.',
    image: '/photos/service-design-build.jpg',
  },
] as const

// Gallery — a single build shown in sequence: foundation, framing, finished home.
export const buildSteps = [
  {
    step: 'Foundation',
    image: '/photos/gallery-foundation.jpg',
    alt: 'Poured concrete foundation walls on a new McNelly build site',
  },
  {
    step: 'Framing',
    image: '/photos/gallery-framing-truck.jpg',
    alt: 'Ranch home under frame with the McNelly work truck on site',
  },
  {
    step: 'Finished home',
    image: '/photos/gallery-craftsman.jpg',
    alt: 'Completed craftsman ranch home with attached garage',
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
  },
  {
    quote:
      'I have worked with McNelly Construction since 2001 and am proud to call them friends. They bring impeccable integrity to everything they do and consistently provide fair, transparent pricing. Every project is approached as an opportunity to deliver exceptional value while sharing the depth of experience they bring to their clients.',
    name: 'Jeffrey Ferweda',
    title: 'Sedgwick & Ferweda Architects',
    image: '/photos/testimonial-church-interior.jpg',
  },
  {
    quote:
      'McNelly Construction has been a fantastic partner on our custom-built barn-dominium; combining craftsmanship, reliability, and clear communication from start to finish. I’d highly recommend their team to anyone looking for a builder who truly takes pride in their work and delivers on their promises.',
    name: 'Jeff Berlin',
    title: '',
    image: '/photos/barndominium.jpg',
  },
] as const

// Mid-page call-to-action band.
export const cta = {
  heading: 'Ready to get started? Book a consultation with us today.',
  sub: 'Tell us about your project and we’ll help you take the first step.',
  image: '/photos/cta-framing-bw.jpg',
} as const
