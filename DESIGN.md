---
name: Architectural Integrity
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad7'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#727974'
  outline-variant: '#c1c8c2'
  surface-tint: '#436556'
  primary: '#03271a'
  on-primary: '#ffffff'
  primary-container: '#1b3d2f'
  on-primary-container: '#84a895'
  inverse-primary: '#aacfbb'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#381816'
  on-tertiary: '#ffffff'
  tertiary-container: '#512d2a'
  on-tertiary-container: '#c6948f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5ebd7'
  primary-fixed-dim: '#aacfbb'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#2c4d3f'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#f0b9b4'
  on-tertiary-fixed: '#311210'
  on-tertiary-fixed-variant: '#633c39'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
  bronze-accent: '#A68966'
  blueprint-gray: '#F4F5F5'
  deep-forest: '#0D261C'
  muted-gold: '#C5A059'
typography:
  headline-display:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  nav-link:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
spacing:
  unit: 8px
  gutter: 24px
  margin-edge: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system for McNelly Construction Inc. is rooted in the concepts of **Veracity, Professionalism, and Decades of Experience**. The visual language is an intersection of **Corporate Modernism** and **Architectural Minimalism**, evoking the same precision and structural soundness found in a master-planned construction project.

The UI should feel authoritative yet accessible, utilizing a "high-end firm" aesthetic characterized by:
- **Bold Grids:** Mathematical layouts that reflect blueprints and structural engineering.
- **Ample Whitespace:** Strategic use of "breathing room" to emphasize quality over quantity.
- **Refined Materiality:** Use of thin lines (hairline dividers) and deep, saturated tones to suggest premium craftsmanship.
- **Fluent Motion:** Interactions that are reactive and smooth, mirroring the coordinated effort of a professional building team.

## Colors

The palette is professional and deep, moving away from standard construction "safety yellows" toward a more executive architectural aesthetic.

- **Primary (Forest Green):** A deep, saturated green derived from the company's heritage, representing growth, stability, and enduring value.
- **Secondary (Charcoal):** A near-black neutral used for high-contrast typography and structural elements, providing a grounded feel.
- **Accents (Bronze/Gold):** Utilized sparingly for micro-interactions, CTA highlights, and award recognitions, nodding to a "Best of the Best" standard of excellence.
- **Backgrounds:** Primarily stark white or light `blueprint-gray` to maintain a clean, modern canvas.

## Typography

This system employs a sophisticated typographic pairing to balance modern precision with traditional credibility.

- **Headlines (Hanken Grotesk):** A sharp, high-contrast sans-serif that communicates contemporary engineering and clarity. Display sizes should use heavy weights with tight tracking for a "monumental" look.
- **Body (Source Serif 4):** A professional, highly readable serif that evokes the "Veracity" and historical depth of the brand. It provides a literary quality to the company's story and service descriptions.
- **Labels:** Small-scale uppercase sans-serif text is used for eyebrow headers and technical metadata, reinforcing the architectural blueprint aesthetic.

## Layout & Spacing

The layout philosophy is based on a **Structural Fixed Grid** that adapts gracefully to different viewports.

- **Grid Model:** A 12-column grid for desktop with wide gutters (24px) to allow for the inclusion of vertical "hairline" dividers between content blocks.
- **Sectioning:** Generous vertical spacing (`section-gap`) is used to separate distinct phases of the brand story—History, Services, Portfolio.
- **Responsive Behavior:**
  - **Desktop:** Wide margins (64px) to create a focused, premium reading experience.
  - **Mobile:** Content reflows to a single column with reduced margins (20px) and condensed typography scales.
- **Thin Dividers:** 1px borders in `primary_color_hex` at 10-20% opacity should be used to define grid areas without creating visual clutter.

## Elevation & Depth

To maintain a "modern architectural" vibe, the design system avoids heavy drop shadows in favor of **Tonal Layering** and **Subtle Outlines**.

- **Surface Tiers:** Depth is communicated through color blocking. Dark charcoal sections may sit adjacent to blueprint-gray sections to create a sense of scale and transition.
- **Ghost Borders:** Use extremely low-contrast 1px outlines on cards and containers. This mimics the appearance of technical drawings and schematics.
- **Shadows:** If used (e.g., for hovering over a portfolio piece), shadows must be "Ambient"—highly diffused, low-opacity, and slightly tinted with the Primary Forest Green to feel integrated rather than "floating."

## Shapes

The shape language is strictly **Sharp (0px)**.

In construction, precision is found in clean lines and right angles. By using 90-degree corners for buttons, images, and containers, the UI reinforces the brand's association with structural integrity and professional drafting. Pill shapes or soft corners are to be avoided entirely to maintain the serious, architectural tone of the brand.

## Components

### Buttons
- **Primary:** Solid `primary_color_hex` with white `nav-link` text. No border, sharp corners.
- **Secondary:** Transparent background with a 1px solid `secondary_color_hex` border.
- **Interaction:** On hover, primary buttons should have a subtle bronze underline reveal or a slight shift in background saturation.

### Cards (Project Portfolio)
- Portfolio cards use a "Full Bleed" image approach.
- Text overlays should appear on hover using a `deep-forest` semi-transparent wash (80% opacity) with white typography.
- Information hierarchy within the card: Project Title (Headline-md), Location (Label-caps), Year (Label-caps).

### Input Fields
- Underline-only style fields to mimic architectural forms.
- Focus state: The 1px bottom border transitions from charcoal to bronze.
- Labels sit above the field in `label-caps` style.

### Lists & Dividers
- Use thin 1px horizontal lines to separate list items (e.g., in the "Consulting Division" details).
- Bullet points should be replaced with custom bronze-colored square markers or simple dashes.

### Reveal Animations
- Components should use "Intersection Observer" reveals. As the user scrolls, content blocks should slide up 20px while fading in with a `cubic-bezier(0.16, 1, 0.3, 1)` easing for a fluid, professional feel.

## Motion

Implemented with the **Motion** library (`motion/react`). Every animation is gated by
`useReducedMotion()` — when the user prefers reduced motion, elements render in place
with no transform, parallax, autoplay, or count-up.

- **Reveals** (`src/components/Reveal.tsx`): `whileInView`, `once`, `initial {opacity:0, y:20}`,
  0.7s `cubic-bezier(0.16, 1, 0.3, 1)`; optional `delay` for stagger.
- **Hero** (`src/components/Hero.tsx`): a featured-project carousel — cross-fading background
  with a slow Ken-Burns scale, `useScroll`/`useTransform` parallax (≤16%), 6s autoplay that
  pauses on pointer/focus within the section, staggered headline entrance, thumbnail rail
  with an animated bronze underline on the active slide.
- **Navbar**: shared-element (`layoutId`) underline that slides between the active section
  link; `AnimatePresence` height/opacity for the mobile menu with staggered links.
- **Projects**: `layout` grid + `AnimatePresence` (`popLayout`) so cards scale/fade and
  re-flow smoothly when a category filter changes.
- **About**: framed photo parallax; a one-shot count-up on the experience stat trio.
