# Requirements — Columns & Pillars Tech Website

## Project Overview
A professional marketing website for Columns & Pillars Tech Ltd — an architecture-led AI transformation consultancy founded by Mohammed Bakare. The site showcases services, the CivicGuardian AI product, and establishes authority through work and projects rather than biography.

## Functional Requirements

### FR-1: Navigation
- Fixed dark navigation bar present on all pages
- Navigation order: Home · Services · CivicGuardian AI · Projects · About · Contact
- Active page state highlighted in orange
- Mobile hamburger menu below 1024px
- "Get in Touch" CTA button links to contact.html

### FR-2: Pricing
- No prices displayed anywhere on the site
- All pricing references use: "Contact us to discuss", "Scoped per engagement", or "Engagement-based pricing"
- No £ amounts on any page

### FR-3: Pages
- index.html — Homepage with hero, services overview, CivicGuardian teaser, stats, process, CTA
- services.html — Detailed service pages for all three offerings
- civicguardian.html — Dedicated product page for CivicGuardian AI
- projects.html — Architecture builds, tech stack, active development showcase
- about.html — Short team-style page, founder card with photo placeholder
- case-studies.html — Project case studies with results
- contact.html — Contact form and company details

### FR-4: CivicGuardian AI Prominence
- CivicGuardian AI must be prominent on the homepage
- Dedicated page in main navigation
- AWS AIdeas competition status (Semifinalist, $250,000 prize pool, re:Invent 2026) displayed
- Amazon Bedrock Nova technology highlighted

### FR-5: Contact Form
- Fields: Name, Email, Company, Service interest (select), Message
- Client-side validation
- Success and error states
- Submits to hello@columnsnpillars.co.uk

### FR-6: Accessibility
- WCAG AA target
- Skip navigation link
- Semantic HTML5 landmarks
- Focus styles on all interactive elements
- Screen reader labels on icons and form fields

### FR-7: Performance
- No frameworks or libraries
- Pure HTML5 + CSS3 + Vanilla JS only
- All CSS in css/style.css
- All JS in js/main.js
- No inline styles

## Non-Functional Requirements

### NFR-1: Brand Consistency
- All colours via CSS custom properties only
- Brand palette: orange (#E8702A), dark scale (#0A0A0A–#2D2D2D), grey scale
- Typography: Inter (sans), JetBrains Mono (mono)
- Design benchmarks: McKinsey editorial authority, Palantir dark aesthetic, IBM systematic trust

### NFR-2: Responsive Design
- Fully responsive across desktop (1280px+), tablet (768–1024px), mobile (320–767px)
- Breakpoints at 1280px, 1024px, 768px, 480px

### NFR-3: SEO
- Semantic HTML structure
- Meta descriptions on all pages
- sitemap.xml and robots.txt present
- Open Graph tags on key pages

### NFR-4: Domain
- columnsnpillars.co.uk
- Contact: hello@columnsnpillars.co.uk
