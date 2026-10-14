# Nikka Mae D. Caldito — Portfolio

Personal site for recruiters and hiring managers. Built from the [brewed-ops/portfolio-template](https://github.com/brewed-ops/portfolio-template) **stack** (Vite 6, React 19, TypeScript, CSS tokens, Poppins, Phosphor, light-default theme) and reshaped into a single-page, scan-friendly layout.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # typecheck + production build
npm run preview  # serve dist/
npm run lint
```

## Edit content (do this first)

All copy, projects, Figma URLs, social links, stats, and contact details live in **one file**:

`src/data/portfolio.ts`

You do not need to edit React components for routine updates.

## Replace these files and links

| What | Where |
| --- | --- |
| CV PDF | `public/Nikka_Mae_Caldito_CV.pdf` |
| System project files | Google Drive links on `liveUrl` in `src/data/portfolio.ts` |
| System card previews | `public/projects/system-coal-combustion.svg`, `system-cinema-buz.svg`, `system-healthcare-appointment.svg` (replace with screenshots when available) |
| Power BI screenshot | `public/projects/dashboard-pbi-e2e.jpg`, `dashboard-pbi-capstone.jpg` |
| Figma previews | `public/projects/figma-creative-clicks.svg`, `figma-sustainovative.svg` |
| Figma prototype URLs | `figmaUrl` on the Figma projects in `src/data/portfolio.ts` |
| Optional live/GitHub URLs | `liveUrl` / `githubUrl` on system projects |
| LinkedIn / GitHub / Facebook | `socials` in `src/data/portfolio.ts` |
| Canonical / Open Graph URL | `index.html` (`https://example.com`) and `site.url` in `portfolio.ts` |
| Favicon / share image | `public/favicon.svg`, `public/og-image.svg` |
| Contact form | `.env` — see below |

Video specs are in `public/projects/README.txt`. After you drop in MP4s, keep `videoUrl` and `poster` in `portfolio.ts` in sync (you can switch posters to `.jpg`).

## Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io).
2. Copy `.env.example` to `.env`.
3. Set:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Until that variable is set, the form opens a `mailto:` draft to the email in `portfolio.ts`.

EmailJS works the same way if you point `VITE_CONTACT_ENDPOINT` at a serverless proxy that accepts JSON `{ name, email, message }`.

## Deploy

### GitHub Pages (recommended for a public recruiter URL)

This is a **Vite 6 + React 19** app. GitHub Actions builds `dist/` and publishes it.

Expected live URL if the repository is named `Portfolio_Caldito` under `nikkacaldto`:

**https://nikkacaldto.github.io/Portfolio_Caldito/**

1. On GitHub, create a **public** repository named `Portfolio_Caldito` (same spelling as the folder). Do not initialize it with a README if you already have this project locally.
2. In this project folder, point `origin` at your repo (the current remote still points at the template):

```bash
git remote rename origin template
git remote add origin https://github.com/nikkacaldto/Portfolio_Caldito.git
git add -A
git commit -m "Publish Nikka Caldito portfolio"
git branch -M main
git push -u origin main
```

3. GitHub → **Settings → Pages** → Build and deployment **Source: GitHub Actions**.
4. Open the **Actions** tab, wait for **Deploy GitHub Pages** to finish, then open the URL above.

If you name the repo `nikkacaldto.github.io` instead, the site is served at `https://nikkacaldto.github.io/` (root). Update `site.url` in `src/data/portfolio.ts` and the canonical / Open Graph URLs in `index.html` to match.

Optional: add a repository secret `VITE_CONTACT_ENDPOINT` with your Formspree URL so the contact form posts online. Without it, the form still opens a `mailto:` draft.

Local `npm run dev` stays at `http://localhost:5173` (base `/`). The Pages base path is applied only in GitHub Actions via `GITHUB_REPOSITORY`.

### Vercel

```bash
npm i -g vercel
vercel
```

Or import the GitHub repo in the Vercel dashboard. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.

Set `VITE_CONTACT_ENDPOINT` in Project → Settings → Environment Variables, then redeploy.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect the repo. Build command: `npm run build`. Publish directory: `dist`.

`vercel.json` and `netlify.toml` are included for SPA routing.

After deploy, replace `https://example.com` in `index.html` (canonical, Open Graph) with your live URL so share previews work.
