# Columns & Pillars Tech — Official Website

**Architecture-Led AI Transformation**

Official website for [Columns & Pillars Tech Ltd](https://columnsnpillars.co.uk) — a UK-registered technology company specialising in cloud architecture, agentic AI systems, and intelligent operational workflows.

Built using [Amazon Kiro](https://kiro.dev) agentic IDE with spec-driven development.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero, services overview, CivicGuardian teaser, process steps, stats strip |
| Services | `services.html` | Fractional SA Retainer, Architecture Audit, AI & Cloud Transformation |
| CivicGuardian AI | `civicguardian.html` | Full product page — features, sectors, tech stack, origin story |
| CivicGuardian Demo | `civicguardian-demo.html` | Demo video, screenshot gallery, architecture flowchart |
| Projects | `projects.html` | Featured builds, tech stack, active development |
| About | `about.html` | Founder profile — Mohammed Bakare, Founder & CEO |
| Case Studies | `case-studies.html` | CivicGuardian featured case + illustrative problem patterns |
| Contact | `contact.html` | Enquiry form, contact details, FAQ |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic, ARIA-labelled) |
| Styling | CSS3 — custom properties, CSS Grid, Flexbox |
| JavaScript | Vanilla JS — no frameworks, no libraries |
| Fonts | Inter (sans) + JetBrains Mono (monospace) via Google Fonts |
| AI Product | Amazon Bedrock Nova |
| Build Tool | Amazon Kiro — agentic IDE, spec-driven development |
| Hosting | TBC — static site, deployable to S3/CloudFront or Netlify |
| Version Control | Git + GitHub |

No build tools. No bundlers. No dependencies. Pure HTML + CSS + JS.

---

## CivicGuardian AI

CivicGuardian AI is a human-in-the-loop digital safeguarding platform built on **Amazon Bedrock Nova**. It synthesises fragmented social care data, identifies escalating risk patterns, and surfaces prioritised alerts to practitioners — helping Local Authorities, NHS trusts, and Housing Associations protect vulnerable adults before situations reach crisis point.

**AWS Global 10,000 AIdeas Competition 2025**
- Status: Semi-Finalist — Social Impact Category
- Prize pool: $250,000
- Finalists announced at AWS re:Invent 2026

**Origin:** Mohammed Bakare volunteered at a UK Trust and with is work from the health Care sector and directly experienced how fragmented social care data was failing vulnerable adults. CivicGuardian was designed to solve that problem.

**Published on AWS Builder Center:**
[https://builder.aws.com/content/39pMA9C7qgjaIBqKJ0iAdQh2YmK/](https://builder.aws.com/content/39pMA9C7qgjaIBqKJ0iAdQh2YmK/)

---

## Design System

The site follows three design benchmarks:

- **McKinsey shell** — editorial authority, whitespace-first, typography carries hierarchy
- **Palantir edge** — deep `#0A0A0A` dark sections, monospace numbers, SVG grid overlays
- **IBM trust** — systematic components, proof points, accessibility-first

Brand colours are defined exclusively as CSS custom properties in `css/style.css`. No hardcoded hex values outside `:root`.

---

## Project Structure

```
columnspillars-website/
├── css/
│   └── style.css          # Complete design system — all styles
├── js/
│   └── main.js            # All JavaScript — nav, animations, form, lightbox
├── images/                # CivicGuardian screenshots + founder photo
├── .kiro/
│   ├── specs/website/     # Requirements, design, tasks (spec-driven dev)
│   └── steering/          # Always-on project context for Kiro
├── index.html
├── services.html
├── civicguardian.html
├── civicguardian-demo.html
├── projects.html
├── about.html
├── case-studies.html
├── contact.html
├── sitemap.xml
└── robots.txt
```

---

## Company

**Columns & Pillars Tech Ltd**
Company No. 16649974
Oxford, United Kingdom

hello@columnsnpillars.co.uk
[columnsnpillars.co.uk](https://columnsnpillars.co.uk)

Registered in England & Wales · August 2025
