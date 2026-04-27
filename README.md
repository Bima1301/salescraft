# SalesCraft — AI Sales Page Generator

SalesCraft is a full-stack web application that transforms raw product/service information into complete, structured, and beautifully designed sales pages using AI (OpenAI GPT-4o mini).

Built with **Next.js App Router**, **Elysia** (Bun HTTP framework), **Better Auth**, **Drizzle ORM** (PostgreSQL), **TanStack React Query**, and **shadcn UI** components — all styled with a **Modern Minimalist + Glassmorphism** design concept.

---

## Features

### Core
- **User Authentication** — Register, login, logout via Better Auth (email/password). Route protection with automatic redirects.
- **Product Input Form** — Structured form with: product/service name, description, key features (multi-tag input), target audience, price, unique selling points, and template selection.
- **AI Sales Page Generation** — Sends product data to OpenAI GPT-4o mini and generates a full structured sales page including:
  - Compelling headline & sub-headline
  - Product description
  - Benefits section (3 benefit cards)
  - Features breakdown (with icons)
  - Social proof / testimonials (placeholder quotes)
  - Pricing display
  - Call-to-action (CTA)
- **Saved Pages** — All generated pages are saved to the database. Users can **view**, **re-generate**, and **delete** their pages.
- **Live Preview** — Fully styled sales page preview rendered as a real landing page layout, with template-based theming.

### Bonus
- **Export as HTML** — Download the generated sales page as a standalone, self-contained HTML file ready to deploy anywhere.
- **Multiple Templates** — Three design themes: **Modern** (violet/indigo), **Bold** (orange/red), **Elegant** (emerald/teal).
- **Section-by-section Regeneration** — Regenerate only the headline, CTA, benefits, features, testimonials, or pricing without touching the rest.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 App Router, React 19, Tailwind CSS v4 |
| Backend API | Elysia (Bun HTTP), Eden Treaty (type-safe client) |
| Authentication | Better Auth (email/password) |
| Database | Drizzle ORM + PostgreSQL |
| AI | OpenAI SDK (GPT-4o mini) |
| State Management | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| UI Components | shadcn UI + Lucide Icons |
| Styling | Tailwind CSS v4, glassmorphism utilities |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── page.tsx                    # Landing page
│   ├── (auth)/
│   │   ├── layout.tsx                  # Auth layout (glassmorphism)
│   │   ├── login/                      # Login page
│   │   └── register/                   # Register page
│   ├── (protected)/
│   │   ├── layout.tsx                  # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   ├── page.tsx                # Dashboard overview with stats
│   │   │   └── sales-pages/
│   │   │       ├── page.tsx            # Sales pages list
│   │   │       ├── new/page.tsx        # Create new sales page
│   │   │       ├── [id]/page.tsx       # View/edit/preview sales page
│   │   │       ├── _server/
│   │   │       │   ├── route.ts        # Elysia CRUD + AI generation
│   │   │       │   ├── type.ts         # Types & Zod schemas
│   │   │       │   └── index.ts        # React Query hooks
│   │   │       └── _components/
│   │   │           ├── sales-page-form.tsx
│   │   │           ├── sales-page-card.tsx
│   │   │           ├── sales-page-preview.tsx
│   │   │           ├── sales-page-detail.tsx
│   │   │           └── sales-pages-client.tsx
│   │   └── settings/page.tsx
│   ├── api/[[...slugs]]/route.ts       # Elysia app (all API routes)
│   ├── globals.css                     # Tailwind + glassmorphism utilities
│   └── layout.tsx                      # Root layout (ThemeProvider, QueryProvider)
├── components/
│   ├── ui/                             # shadcn UI components
│   ├── dashboard-nav.tsx               # Responsive sidebar navigation
│   ├── theme-toggle.tsx                # Dark/light mode toggle
│   └── theme-provider.tsx              # next-themes provider
├── db/
│   └── schema.ts                       # Drizzle schema (user, session, salesPages...)
├── lib/
│   ├── auth.ts                         # Better Auth server instance
│   ├── auth-client.ts                  # Better Auth React client
│   ├── eden.ts                         # Eden treaty client
│   └── utils.ts                        # Utility functions
└── server/
    └── protected-route.ts              # Elysia auth macro
```

---

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=your_neon_or_postgres_connection_string
BETTER_AUTH_SECRET=your_secret_key_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-openai-api-key
```

- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — A random secret (32+ chars). Generate with `openssl rand -base64 32`
- `OPENAI_API_KEY` — Your OpenAI API key from [platform.openai.com](https://platform.openai.com)

### 3. Push database schema

```bash
bun run db:push
# or
bunx drizzle-kit push
```

### 4. Run development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes (Elysia)

All routes are mounted under `/api` via `src/app/api/[[...slugs]]/route.ts`.

### Sales Pages

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/sales-pages` | List user's sales pages | ✓ |
| `GET` | `/api/sales-pages/:id` | Get a single sales page | ✓ |
| `POST` | `/api/sales-pages` | Create + AI-generate a sales page | ✓ |
| `POST` | `/api/sales-pages/:id/regenerate` | Regenerate full page or a section | ✓ |
| `PATCH` | `/api/sales-pages/:id` | Update inputs + re-generate | ✓ |
| `DELETE` | `/api/sales-pages/:id` | Delete a sales page | ✓ |

### Auth (Better Auth)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/sign-in/email` | Sign in |
| `POST` | `/api/auth/sign-up/email` | Register |
| `POST` | `/api/auth/sign-out` | Sign out |

---

## Design System

- **Theme:** Modern Minimalist + Glassmorphism accent
- **Default mode:** Dark
- **Primary color:** Violet/Purple (`oklch(0.65 0.22 285)`)
- **Glass utilities:** `.glass`, `.glass-card`, `.glow`, `.glow-lg`, `.gradient-text`, `.gradient-bg`
- **Templates:**
  - `modern` — Violet/Indigo gradient
  - `bold` — Orange/Red gradient
  - `elegant` — Emerald/Teal gradient

---

## Scripts

```bash
bun run dev        # Start development server
bun run build      # Build for production
bun run start      # Start production server
bun run lint       # Lint with Biome
bun run format     # Format with Biome
bun run db:push    # Push schema to database
bun run db:studio  # Open Drizzle Studio (DB browser)
```

---

## Docker Deployment (VPS)

The project ships with a multi-stage `Dockerfile` (using `oven/bun:1-alpine`) and a `docker-compose.yml` that includes a **plain PostgreSQL 16** service — no external DB required.

### Services

| Service | Container | Port |
|---|---|---|
| Next.js app | `salescraft` | `3000` |
| PostgreSQL 16 | `salescraft-db` | internal only |

Both services join the `shared_net` external network (for nginx reverse proxy).

### Prerequisites

- Docker & Docker Compose installed on the VPS
- A shared Docker network named `shared_net`

```bash
# Create the shared network once (if it doesn't exist yet)
docker network create shared_net
```

### Deploy

```bash
# 1. Copy and fill in .env
cp .env.example .env
# Set BETTER_AUTH_SECRET, OPENAI_API_KEY, NEXT_PUBLIC_BASE_URL
# DATABASE_URL is pre-filled to point to the postgres service

# 2. Build and start both services
docker compose up -d --build

# 3. Push DB schema (first deploy only, or after schema changes)
docker compose exec app bunx drizzle-kit push
```

The `DATABASE_URL` in `.env.example` is already configured to connect to the `postgres` container:
```
postgresql://salescraft:salescraft@postgres:5432/salescraft
```

### Update

```bash
git pull
docker compose up -d --build
```
