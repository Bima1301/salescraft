# SalesCraft — Video Demo Script (3–6 minutes)

Use this as a read-along script while screen recording. Keep the pace fast and focus on proof: **live URL**, **database persistence**, and **user interaction**.

---

## Pre-record Checklist (30 seconds)

- Open the deployed app in an incognito window: `https://<your-domain>`
- Prepare a Postgres DB already migrated (`bun run db:push` against production)
- Make sure environment variables are set in production:
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL`
  - `NEXT_PUBLIC_BASE_URL`
  - `OPENAI_API_KEY`

Optional (nice): Have the DB dashboard open (Neon/Supabase) for 10 seconds to show the `sales_pages` table exists.

---

## Timeline + Narration

### 0:00–0:20 — Intro + Live URL

**Say:**
“Hi, I’m <name>. This is SalesCraft, an AI Sales Page Generator. I’ll walk through the live system, show authentication, generate a sales page with AI, and prove it’s saved in the database.”

**Do:**
- Show the browser address bar with the production URL.

---

### 0:20–1:20 — Authentication (Better Auth)

**Say:**
“First, users can register and sign in with email/password. Routes are protected and redirect automatically.”

**Do:**
- Click **Register**
- Create a user (use a fresh email alias if possible)
- Log in

**Callout (quick):**
“Sessions and users are stored in PostgreSQL via Better Auth + Drizzle.”

---

### 1:20–3:00 — Create Sales Page (AI generation)

**Say:**
“Now I’ll create a new sales page by entering structured product info. This input is sent to the backend, then OpenAI generates a structured landing page.”

**Do:**
- Go to **Sales Pages** → **New**
- Fill the form (example below)
- Choose a template (Modern/Bold/Elegant)
- Click **Generate**

**Example input (copy-friendly):**
- Product name: “FocusFlow”
- Description: “A minimalist Pomodoro + task manager for remote workers.”
- Key features: “Pomodoro timer”, “Task list”, “Focus music”, “Daily stats”
- Target audience: “Remote workers and students”
- Price: “$9/month”
- USP: “Distraction-free UI”, “One-click start”, “Weekly insights”

**Say while waiting:**
“The backend is exposed under `/api` using Elysia. Data is validated with schemas, then saved to PostgreSQL with Drizzle. The generated content is stored so users can revisit it.”

---

### 3:00–4:10 — Live Preview + Templates

**Say:**
“This is the live preview rendered like a real landing page. Users can switch templates for different visual styles.”

**Do:**
- Scroll through the generated page (headline → benefits → features → pricing → CTA)
- Switch template (if supported in UI) or show a different page created with another template

---

### 4:10–5:10 — Saved Pages (DB Persistence Proof)

**Say:**
“Now I’ll show the saved pages list. These are persisted in the database, so refreshing or returning later keeps the results.”

**Do:**
- Go back to **Sales Pages** list
- Refresh the browser tab
- Open the generated page again

Optional: briefly show the DB dashboard and point to the `sales_pages` row.

---

### 5:10–5:50 — Regenerate a Section + Delete

**Say:**
“As an interaction feature, users can regenerate only a section without rewriting everything, and can also delete pages.”

**Do:**
- Trigger section regeneration (e.g., headline/CTA/benefits)
- Delete the page
- Confirm it disappears from the list

---

### 5:50–6:10 — Quick Architecture Recap + Close

**Say:**
“In summary: Next.js App Router for UI, Elysia for API routing under `/api`, Better Auth for authentication, Drizzle ORM with PostgreSQL for persistence, and OpenAI for generation. The system is deployed and fully functional on a public URL connected to a real database. Thanks.”

---

## (Optional) 20-second Code Tour (only if time)

If you want a quick code credibility segment:
- Show `src/db/schema.ts` (tables: `sales_pages`, `user`, `session`)
- Show `src/app/api/[[...slugs]]/route.ts` (API mounted under `/api`)
- Show the sales pages router in `src/app/(protected)/dashboard/sales-pages/_server/route.ts`

