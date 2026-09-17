# Brij Nandan — Portfolio

A full-stack portfolio (Next.js + Postgres/Prisma + NextAuth) that's fully editable from a protected `/admin` dashboard — no code changes or redeploys needed to update projects, skills, services, experience, education, or site content.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **PostgreSQL** via **Prisma** (Neon free tier recommended)
- **NextAuth.js** (credentials login, `ADMIN` role, protects `/admin/**`)
- **Tailwind CSS** + hand-rolled UI primitives (`components/ui`)
- **Framer Motion** for scroll reveals, hero animation, hover/tilt, timeline, skill bars
- **Resend** for contact-form email delivery
- **Vercel Blob** for image/resume uploads

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a free Postgres database** — [Neon](https://neon.tech) is easiest. Copy its connection string.

3. **Configure environment variables** — copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Postgres connection string
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your `/admin` login (used once by the seed script)
   - `RESEND_API_KEY` / `CONTACT_TO_EMAIL` — optional; contact form logs a skip message if unset
   - `BLOB_READ_WRITE_TOKEN` — from your Vercel project's Storage tab (needed for image/resume uploads)

4. **Run migrations and seed data**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
   This creates your admin user and pre-populates projects/skills/experience/education from your resumes — edit or replace any of it from `/admin`.

5. **Start the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` to log in.

## Deploying

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env` in the Vercel project settings (use your production Neon connection string; set `NEXTAUTH_URL` to your deployed URL).
4. Enable **Vercel Blob** storage on the project (Storage tab → Create Database → Blob) and copy the token into `BLOB_READ_WRITE_TOKEN`.
5. After the first deploy, run `npm run db:migrate` and `npm run db:seed` locally against the production `DATABASE_URL` (or via `npx prisma migrate deploy`) to set up the schema and your admin user.

## Extending

Adding a new content type (e.g. a blog) follows the same pattern used for Projects/Skills/etc.:

1. Add a model to `prisma/schema.prisma`, run `npx prisma migrate dev`.
2. Add a Zod schema to `lib/validations.ts`.
3. Add `route.ts` / `[id]/route.ts` under `app/api/admin/<resource>/` using `createCrudService` from `lib/crud.ts` (copy an existing resource's routes — it's ~20 lines).
4. Add a field-config file under `components/admin/field-configs/`.
5. Add `page.tsx` / `new/page.tsx` / `[id]/page.tsx` under `app/admin/(dashboard)/<resource>/` — copy an existing resource's three files and swap the config/model.
6. Render it on the public site by querying `prisma.<model>` from a Server Component.

No changes to `AdminTable`, `AdminForm`, or the auth/middleware layer are needed.
