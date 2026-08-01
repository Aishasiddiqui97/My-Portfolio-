# File Explanation — What I Deploy

This document explains every important file in the deployed portfolio. It is written so you understand exactly what is on your live site and what each piece does.

## Project layout (simplified)

```
portfolio-project/
├── frontend/                 ← THE DEPLOYED APP (Next.js)
│   ├── package.json          # Project metadata, scripts, dependencies
│   ├── next.config.ts        # Next.js build configuration
│   ├── tsconfig.json         # TypeScript settings
│   ├── postcss.config.mjs    # Tailwind CSS processing config
│   ├── eslint.config.mjs     # Code-quality rules
│   ├── .gitignore            # Files that must never be pushed
│   ├── public/               # Static files served as-is (PDF, images)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx    # Page shell + SEO metadata (head, fonts)
│       │   ├── page.tsx      # THE homepage — all sections
│       │   ├── globals.css   # Global styles (fonts, smooth scroll)
│       │   ├── not-found.tsx # Custom 404 page
│       │   └── favicon.ico   # Browser tab icon
│       └── lib/
│           └── api.ts        # Contact-form API helper
├── backend/                  # (Optional) Express API — NOT deployed
├── DNS-WALKTHROUGH.md        # How DNS works (this repo's docs)
└── FILE-EXPLANATION.md       # This file
```

---

## Key files — what they do

### `package.json`
The "recipe card" of the app. It lists:
- **Name & version** of the project.
- **Scripts** you can run: `dev` (local server), `build` (production build), `start` (run built app), `lint` (check code quality).
- **Dependencies** — the libraries the site uses: Next.js, React, Tailwind CSS, Framer Motion, GSAP, Three.js, Heroicons.

Vercel reads the `build` script automatically to compile your site.

### `next.config.ts`
Configuration for Next.js itself. It is currently minimal (empty options object) because the default behavior is all we need. If you later add a custom domain, image settings, or redirects, this is where they go.

### `src/app/layout.tsx`
The **shell** that wraps every page. It is deployed as part of the site and controls:
- **SEO metadata** — the page `<title>` ("Aisha A. Siddiqui — Full Stack & AI Developer"), description, keywords, and Open Graph tags (what shows when the link is shared on LinkedIn/WhatsApp).
- **Fonts** — Geist, loaded via `next/font` (self-hosted, fast).
- **Global CSS** import.
- The `<html>` and `<body>` structure.

### `src/app/page.tsx`
The **entire homepage** — the biggest file in the app. It renders every section in one page:
- Hero, About, Experience, Skills, Projects, Resume, Contact, Footer.
- It also holds the `PROJECTS` array — the list of projects you saw in the showcase. To add or edit a project, you edit this array (one block per project: title, description, tech stack, GitHub link, live demo link).

### `src/app/globals.css`
Global styles applied to the whole site:
- Tailwind CSS base + custom styling.
- Smooth scrolling for anchor links.
- `scroll-margin-top` so the fixed navigation bar never covers section headings when you jump to them.
- `prefers-reduced-motion` — respects users who disable animations.

### `src/app/not-found.tsx`
The themed **404 page**. When a visitor goes to a URL that doesn't exist, they see a styled "Page not found" screen with a "Back to Home" button instead of a plain browser error.

### `src/lib/api.ts`
A small helper for the contact form. It tries to send the form to a backend API (`NEXT_PUBLIC_API_BASE_URL`) if one is configured. If not, the page's form falls back to opening the visitor's email app (`mailto:`).

### `public/`
Files here are served **as-is** at the site root — no processing:
- `resume.pdf` → served at `/resume.pdf` (the CV download).
- `profile.jpg` → the hero portrait photo (`/profile.jpg`).
- `favicon.ico` → the tab icon.
- `cv.pdf`, `resume.html`, `resume.txt` → alternate resume formats.
- `fashion-portfolio.html` → a fashion design showcase page.

### `frontend/.vercel/`
Local Vercel settings (which project this folder is linked to). It is **not** part of your website — it only tells the Vercel CLI which project to deploy to.

---

## Files that are NOT deployed

| File | Why it isn't deployed |
| --- | --- |
| `node_modules/` | All downloaded libraries — Vercel reinstalls them during build |
| `.next/` | Local build cache — Vercel creates its own |
| `.env*.local` | Secret keys — never commit or deploy these |
| `backend/` | Optional API server — the site works without it (contact form falls back to email) |
| `.git/` | Git history — internal only |

---

## What actually goes online

When Vercel builds the project, this happens:

1. Vercel runs `npm install` (downloads dependencies).
2. Vercel runs `npm run build` → Next.js compiles `src/app/` into optimized static files.
3. The `public/` folder is copied as-is.
4. The result — a `frontend/` build with HTML, CSS, JavaScript, and your images/PDF — is served over HTTPS at:
   `https://aisha-siddiqui-portfolio.vercel.app`

The visitor's browser downloads these static files, and the page renders instantly — no database, no server code needed for the public site.
