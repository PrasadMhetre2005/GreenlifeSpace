# Greenlife Spaces — Public Website

The public-facing marketing site for PlantCare / Greenlife Spaces, built
with Next.js (App Router), TypeScript and Tailwind CSS, per the project
report's Phase 1 scope.

## Pages included

- `/` — Home
- `/services` — full service list
- `/our-work` — gallery + case studies
- `/service-areas` — localities served
- `/about`
- `/contact` — general inquiry form (FR-3)
- `/request-service` — service request form (FR-2), pre-fills the service
  when linked as `/request-service?service=plant-styling`

## Design system

Tokens live in `tailwind.config.ts` (colors: `moss`, `ink`, `greige`,
`sage`, `ochre`) and `app/globals.css` (the `.specimen-tag` label style and
`.clip-leaf` / `.clip-leaf-alt` organic photo masks). Fonts are Fraunces
(serif, headlines) and Work Sans (body), loaded via `next/font` in
`app/layout.tsx` — no extra setup needed, no logo file required yet.

**Photos are placeholders.** `components/PhotoPlaceholder.tsx` renders a
gradient block standing in for real photography. Once you have photos in
Cloudinary (per the report's file-upload plan), swap the `<div>` inside
that component for a Next.js `<Image src="https://res.cloudinary.com/..."
/>` — every page already uses this one component, so it's a single-file
change.

## Connecting to the backend

Forms POST JSON to the Spring Boot API via `lib/api.ts`:

- `RequestServiceForm` → `POST /api/service-requests` (FR-2)
- `InquiryForm` → `POST /api/inquiries` (FR-3)

Set the backend URL in `.env.local` (copy `.env.local.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Until the backend exists, submitting a form will show the error state —
that's expected. We'll build the Spring Boot API next.

## Database

The PostgreSQL schema for the planned Spring Boot API lives in
`database/schema.sql`, with the six current service offers in
`database/seed.sql`. It covers offers, service requests, inquiries, admin
users, showcase projects, project services and showcase images.

Create a local database and run the scripts with PostgreSQL:

```bash
createdb greenlife_spaces
psql -d greenlife_spaces -f database/schema.sql
psql -d greenlife_spaces -f database/seed.sql
```

The current `/admin/showcase` screen uses browser storage as a frontend
prototype. The Spring Boot admin endpoints should replace that storage with
the `showcase_projects` tables once authentication is added.

The Spring Boot API is in `backend/`. See `backend/README.md` for local setup,
public endpoints, and the protected admin showcase endpoints.

## Local development

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Visit http://localhost:3000.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. In Vercel, "Add New Project" → import the repo (framework preset:
   Next.js, auto-detected).
3. Add the environment variable `NEXT_PUBLIC_API_URL` in the Vercel
   project settings, pointing at your deployed Render backend.
4. Deploy. Every push to the main branch redeploys automatically.

## Changing the logo / colors later

- Logo: once you share it, we'll drop it into `public/` and swap the
  text lockup in `components/Navbar.tsx` and `components/Footer.tsx` for
  an `<Image>`.
- Colors: everything routes through the `moss` / `ochre` / `sage` /
  `greige` tokens in `tailwind.config.ts` — updating those values
  restyles the whole site without touching component files.
