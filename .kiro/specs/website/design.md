# Design — Columns & Pillars Tech Website

## Design Philosophy
Three-way benchmark: McKinsey editorial authority (whitespace-first, typography carries hierarchy) + Palantir dark aesthetic (deep blacks, monospace numbers, SVG grid overlays) + IBM systematic trust (proof points, consistent components, accessibility).

## Tech Stack
- Pure HTML5 + CSS3 + Vanilla JS
- No frameworks, no libraries, no build tools
- `css/style.css` — single stylesheet for all pages
- `js/main.js` — single script for all pages
- Google Fonts: Inter + JetBrains Mono (loaded via `<link>` in `<head>`)

## Colour System
All colours via CSS custom properties defined in `:root` of `css/style.css`.

| Token | Value | Usage |
|---|---|---|
| `--orange` | #E8702A | Primary CTA, accents, highlights |
| `--orange-dark` | #C55A18 | Hover states |
| `--orange-light` | #FEF0E7 | Chip backgrounds, icon backgrounds |
| `--black` | #0A0A0A | Dark sections, nav background |
| `--dark-2` | #1A1A1A | Card backgrounds |
| `--grey-50` | #F8F8F8 | Off-white sections |
| `--white` | #FFFFFF | Light section backgrounds |
| `--risk-high` | #DC3545 | CivicGuardian alert — high |
| `--risk-low` | #22C55E | CivicGuardian alert — low |

## Typography
- Display headings: Inter, weight 800–900, tight tracking (-0.025em to -0.04em)
- Body: Inter, weight 400–500, line-height 1.7
- Monospace numbers/labels: JetBrains Mono (stats, badges, mock UI)
- Fluid type scale via `clamp()` — no fixed px sizes on headings

## Layout System
- Max container: 1280px, centred, fluid padding via `clamp(24px, 5vw, 80px)`
- 8px base spacing unit (`--sp-1` through `--sp-15`)
- CSS Grid for all multi-column layouts
- No floats, no flexbox hacks

## Navigation
- Fixed, dark (`rgba(10,10,10,0.96)`), backdrop blur
- Height: 72px
- Logo left, links centre-right, CTA button far right
- Mobile: hamburger toggle below 1024px, full-width dropdown panel

## Page-by-Page Design

### index.html — Homepage
1. **Hero** — Dark full-bleed, large display headline, sub-copy, two CTAs, services visual panel (right column)
2. **Trust bar** — Dark strip: AWS AIdeas Semifinalist · Amazon Bedrock · England & Wales Registered
3. **Services strip** — Dark section, 3 cards (Fractional SA, Architecture Audit, AI & Cloud), no prices
4. **CivicGuardian teaser** — Dark section, left copy + right mock UI showing alert dashboard
5. **Process** — Light section, 4-step numbered grid
6. **Stats strip** — Dark, 4 monospace numbers
7. **Section CTA** — Orange background, centred headline + two buttons

### services.html — Services
1. **Page hero** — Dark strip, headline + sub
2. **Service detail × 3** — Each: icon, heading, enquiry badge ("Contact us to discuss"), body copy, feature list, outcome card, CTA box
3. **FAQ grid** — 2-column, light background
4. **Section CTA** — Orange

### civicguardian.html — CivicGuardian AI
1. **Civic hero** — Deep navy gradient with SVG grid overlay, status badge with pulse dot, headline, sub, two CTAs, mock dashboard panel
2. **Competition banner** — AWS AIdeas Semifinalist, $250,000 prize pool, re:Invent 2026
3. **Feature grid** — 3 columns, white cards
4. **Origin story** — Citizens Advice UK volunteer origin, problem → solution narrative
5. **Sector grid** — Local Authorities / NHS / Housing
6. **Tech stack badges** — Amazon Bedrock Nova featured, supporting AWS services
7. **Section CTA** — Orange

### projects.html — Projects
1. **Page hero** — Dark strip
2. **Projects grid** — Cards showing architecture builds, tech stack tags, active development status
3. **CivicGuardian featured** — Prominent card with competition status
4. **Tech stack section** — Grouped by category (AI/ML, Cloud, Infrastructure)

### about.html — About
1. **Page hero** — Dark strip
2. **About grid** — Left: founder card (photo placeholder, name, title, brief bio, socials), Right: credentials + values
3. **Values grid** — 2×2 cards
4. **Section CTA** — Orange

### case-studies.html — Case Studies
1. **Page hero** — Dark strip
2. **Case studies grid** — 2-column cards, dark header, results strip
3. **Impact strip** — Orange, key aggregate numbers

### contact.html — Contact
1. **Page hero** — Dark strip
2. **Contact grid** — Left: form (name, email, company, service, message), Right: contact details + what to expect
3. **Form states** — Validation, success, error

## Component Library (all in css/style.css)
- `.eyebrow` / `.eyebrow-dark` — uppercase label chips
- `.btn` + variants — primary, secondary, outline, ghost, white
- `.service-card` — dark card with hover orange glow
- `.civic-mock-ui` — monospace alert dashboard
- `.stat-item` — monospace number + label
- `.tech-badge` / `.tech-badge.featured` — pill tags
- `.alert-high/med/low` — risk-coloured alert rows
- `[data-animate]` — scroll-triggered fade-up

## JavaScript (js/main.js)
- Nav scroll class (`scrolled`) on window scroll
- Mobile nav toggle
- Scroll animation observer (IntersectionObserver on `[data-animate]`)
- Contact form validation + submission handler
- Active nav link detection based on current page filename

## File Structure
```
index.html
services.html
civicguardian.html
projects.html
about.html
case-studies.html
contact.html
sitemap.xml
robots.txt
css/
  style.css
js/
  main.js
.kiro/
  steering/
    project.md
  specs/
    website/
      requirements.md
      design.md
      tasks.md
```
