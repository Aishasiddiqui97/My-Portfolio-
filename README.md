# Aisha A. Siddiqui — Personal Portfolio

A professional portfolio website showcasing my skills and projects. **Live at https://aisha-siddiqui-portfolio.vercel.app**

## What the site says

- **Who I am:** Full Stack Developer · AI Developer · Fashion Designer (Karachi, Pakistan)
- **What I build:** AI applications, web apps, and software projects — React, Next.js, TypeScript, Python, OpenAI SDK.

Sections: Hero · About · Experience · Skills · Projects · Resume · Contact.

---

## Deployment (how the site is hosted)

### Hosting platform
**Vercel** (free Hobby plan) — chosen because this project is a Next.js app, and Vercel is built by the Next.js team. It provides zero-config deploys, free HTTPS, and instant CDN delivery worldwide.

### Live URL
- **Production:** https://aisha-siddiqui-portfolio.vercel.app
- HTTPS is automatic — visiting `http://...` redirects (308) to `https://...`.
- Deployment protection (the "Login - Vercel" page) has been **disabled** so the site is publicly accessible, including in private/incognito windows.

### Build command
```
cd frontend
npm install
npm run build
```
Vercel runs `npm run build` (Next.js production build) automatically after every push.

### Output folder
Next.js builds into `frontend/.next/` locally. On Vercel the final static output is served from the framework's default output directory (Next.js default). The `public/` folder (PDFs, images) is copied into the build as-is.

### Environment variables
| Variable | Purpose | Required? |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API for the contact form | Optional — if unset, the form falls back to `mailto:` |

No secrets are required to deploy. Never commit `.env*.local` files (they are git-ignored).

### Hosting process (Vercel)
1. Code lives in the `frontend/` directory of this repo, linked to the Vercel project `my-portfolio` (root directory = `frontend`).
2. `vercel --prod` (or a `git push` to the linked repo) triggers a new production deployment.
3. Vercel installs dependencies → runs the build → deploys the output → assigns a unique deployment URL.
4. The stable production URL (`aisha-siddiqui-portfolio.vercel.app`) is an alias that always points to the latest successful production deployment.
5. HTTPS and the SSL certificate are managed automatically by Vercel.

> **Custom domain (future):** add a `CNAME` record pointing `aishasiddiqui.com` → `cname.vercel-dns.com` at your registrar. See `DNS-WALKTHROUGH.md`.

---

## Documentation in this repo

- `DNS-WALKTHROUGH.md` — how DNS, CNAME, and HTTPS work, in plain English.
- `FILE-EXPLANATION.md` — what each deployed file does.
- `SHIP-IT-DELIVERABLES.md` — the previous portfolio review & fixes log.

## Project Structure

This repository contains a full-stack portfolio application with:

- **Frontend**: Next.js application (React-based) - located in the `frontend/` directory
- **Backend**: Node.js/Express API server - located in the `backend/` directory

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB/Mongoose
- **Deployment**: Vercel (frontend), Render/Heroku (backend)

## Features

- Modern, responsive portfolio design
- Contact form with backend integration
- Project showcase section
- Resume/CV download functionality
- Social media links (LinkedIn, GitHub, etc.)

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact me at [your-email@example.com]
