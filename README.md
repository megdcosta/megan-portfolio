# Megan D'Costa — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

All site copy (experience, education, projects, links) lives in `lib/data.ts`.
Project screenshots go in `public/projects/`, company logos in `public/logos/`.

## Deployment

Every push to `main` builds a static export and publishes it to GitHub Pages via
`.github/workflows/deploy.yml`. Live site: https://megdcosta.github.io/megan-portfolio/
