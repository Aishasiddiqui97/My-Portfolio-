# PF-04 Final Checklist & Deliverables

## 1. Live URL

**https://aisha-siddiqui-portfolio.vercel.app**

- ✅ HTTPS enabled (padlock; `http://` redirects to `https://`)
- ✅ Works in private / incognito window (deployment protection disabled)
- ✅ No build errors (`next build` passes clean)
- ✅ Professional URL — no random numbers

---

## 2. Verification checklist (all passed)

| Check | Result |
| --- | --- |
| Home / Hero section | ✅ |
| About section | ✅ |
| Experience section | ✅ |
| Skills section | ✅ |
| Projects section | ✅ |
| Contact section | ✅ |
| States "Full Stack Developer + AI Developer + Fashion Designer" | ✅ |
| States what I build (AI apps, web apps, software projects) | ✅ |
| LinkedIn link | ✅ |
| GitHub link | ✅ |
| CV / Resume PDF (`/resume.pdf`) | ✅ |
| Booking / contact form | ✅ |
| All 6 required projects present | ✅ |
| Project GitHub links (verified) | ✅ |
| Project live demo links (verified HTTP 200) | ✅ |

---

## 3. The 6 required projects (all live)

| Project | GitHub | Live demo |
| --- | --- | --- |
| AI Resume Analyzer | ✅ | ✅ `ai-resume-analyzer-ebon-eight.vercel.app` |
| AI Todo Evolution | ✅ | ✅ `todo-evolution-phase-5-qcbh.vercel.app` |
| Quran Audio Player | ✅ | ✅ `quran-audio-player.vercel.app` |
| RAG Chatbot | ✅ (`final-book`) | — (needs backend; GitHub link provided) |
| Face Vitals AI | ✅ | — (repo + README demo instructions) |
| Portfolio Website | ✅ | ✅ this site |

> **Screenshot note:** The assignment asks for screenshots. No screenshot assets exist for these projects yet. Rather than generate fake images, each card already shows a title, description, tech stack, GitHub link, and live demo (where available). Add real screenshots later by dropping images into `frontend/public/projects/` and adding an `image` field to each project in `src/app/page.tsx`.

---

## 4. LinkedIn & CV — add the website URL

### LinkedIn
1. Log in to LinkedIn → click your profile photo → **View Profile**.
2. Click the **Contact info** card (or the pencil icon).
3. In the **Websites** field, click **Add website**.
4. Choose **Personal** (or Portfolio), and enter:
   - URL: `https://aisha-siddiqui-portfolio.vercel.app`
   - Title: `My Portfolio — Full Stack & AI Developer`
5. Click **Save**.

Optional: in your **Featured** section, click **+ Add** → **Links**, paste the same URL to pin it at the top of your profile.

### CV / Resume (PDF)
Add the website URL in two natural places:
1. **Header (next to name/contact info):** `Portfolio: aisha-siddiqui-portfolio.vercel.app`
2. **Projects section footer or a "Links" line:** `aisha-siddiqui-portfolio.vercel.app`

> Tip: re-export the updated PDF to `frontend/public/resume.pdf` (and `cv.pdf`) and redeploy (`vercel --prod`) so the online resume also shows the new link.

---

## 5. Deployment steps (quick reference)

```bash
cd frontend
npm install
npm run build              # verify no errors
vercel --prod              # deploy production
# stable URL: https://aisha-siddiqui-portfolio.vercel.app
```

---

## 6. Docs in this repo

- `README.md` — project overview + deployment explanation
- `DNS-WALKTHROUGH.md` — DNS, CNAME & HTTPS for non-technical readers
- `FILE-EXPLANATION.md` — what each deployed file does
- `SHIP-IT-DELIVERABLES.md` — previous review/fix log

---

## 7. Notes / limitations

- **RAG Chatbot & Face Vitals AI** have no public live demo yet (RAG needs its backend API; Face Vitals demo requires a Hugging Face Space). Both are real, verifiable GitHub repos. Deploy these later and add the `demo` link to `PROJECTS` in `src/app/page.tsx`.
- **Screenshots** not yet present — add real ones later (see note above).
- **Backend contact API** is not deployed; the contact form currently falls back to the visitor's email app, which always works. Optionally deploy `backend/` (e.g. Render) and set `NEXT_PUBLIC_API_BASE_URL`.
