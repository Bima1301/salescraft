## NextJS + Elysia Starter

This repository is a starter kit that combines:

- **Next.js App Router**
- **Elysia** (Bun HTTP framework) exposed under `/api`
- **Better Auth** for email/password authentication
- **Drizzle ORM** (Postgres / Neon)
- **@tanstack/react-query** for data fetching
- **shadcn UI** components and theming
- **Zod** for end-to-end validation

It includes a minimal but complete auth + protected area flow, and a small CRUD example for `posts` to demonstrate client–server integration.

---

## Features

- **Authentication**
  - Email/password auth via Better Auth.
  - API route: `src/app/api/auth/[...all]/route.ts`.
  - React client via `authClient` from `better-auth/react`.

- **Route groups**
  - `src/app/(public)` – public pages (`/`, `/blog`).
  - `src/app/(auth)` – auth-only pages (`/login`, `/register`); **redirects to `/dashboard` if already logged in**.
  - `src/app/(protected)` – protected pages (`/dashboard`, `/settings`, `/dashboard/post`); **redirects to `/login` if not logged in**.

- **Protected pages**
  - `dashboard` and `settings`:
    - Fetch the current session on the server using `auth.api.getSession({ headers: await headers() })`.
    - Redirect to `/login` when there is no session.
    - Show basic account information and a **Logout** button (Better Auth `signOut`).

- **Posts API + Dashboard CRUD**
  - Backend:
    - Elysia router in `src/app/(protected)/dashboard/post/_server/route.ts` mounted under `/api/posts`.
    - Uses Drizzle models from `src/db/schema.ts`.
    - Body validation using Zod schema from `src/app/(protected)/dashboard/post/_server/type.ts`.
    - Endpoints:
      - `GET /api/posts` – list all posts.
      - `GET /api/posts/:id` – get a single post.
      - `POST /api/posts` – create a post (requires auth).
      - `PATCH /api/posts/:id` – update a post owned by the current user.
      - `DELETE /api/posts/:id` – delete a post owned by the current user.
  - Client (dashboard `/dashboard/post`):
    - Eden treaty client in `src/lib/eden.ts` (`api.posts...`) for type-safe calls.
    - React Query hooks in `src/app/(protected)/dashboard/post/_server/index.ts`.
    - UI in `src/app/(protected)/dashboard/post/_components`:
      - `post-page.tsx` – page container (`PostsPageClient`).
      - `post-form.tsx` – shared form component using React Hook Form + Zod resolver + shadcn `Field` components.
      - `create-dialog.tsx` – create dialog (includes its own `useMutation` for create).
      - `edit-dialog.tsx` – edit dialog (includes its own `useMutation` for update).
    - Toast notifications via `sonner`, configured globally in `src/components/sonner-provider.tsx` and wired in `src/app/layout.tsx`.

- **Blog listing**
  - Public page at `src/app/(public)/blog/page.tsx` (`/blog`).
  - Uses React Query and the same posts API to show all posts as “blogs”:
    - Data loader: `src/app/(public)/blog/_server/index.ts` (`fetchBlogs`, which calls `api.posts.get()`).
    - UI card component (per-post) in `src/app/(public)/blog/_components/blog-card.tsx`.
  - Reuses the `Post` type from the dashboard posts module, so API, dashboard, and blog remain in sync.

---

## Project Structure (high level)

- `src/app/layout.tsx` – root layout, fonts, React Query provider, Devtools, Sonner toaster.
- `src/app/globals.css` – Tailwind CSS + shadcn theme.
- `src/lib/auth.ts` – Better Auth server instance.
- `src/lib/auth-client.ts` – Better Auth React client.
- `src/index.ts` – Drizzle database client.
- `src/db/schema.ts` – Drizzle table definitions (`user`, `session`, `account`, `verification`, `posts`).
- `src/app/api/[[...slugs]]/route.ts` – Elysia app mounted as Next.js API route.
- `src/lib/eden.ts` – Eden treaty client for calling the Elysia app from both server and client.

---

## Running the project

1. **Install dependencies**

```bash
bun install
# or
npm install
```

2. **Configure environment variables**

Create a `.env` file and set at least:

```bash
DATABASE_URL=your_neon_or_postgres_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. **Run development server**

```bash
bun run dev
# or
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Auth & routing rules

- **Login / Register**
  - Pages: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`.
  - If the user already has a session, these pages immediately redirect to `/dashboard`.
  - Forms:
    - `src/app/(auth)/login/_components/login-form.tsx`
    - `src/app/(auth)/register/_components/register-form.tsx`
  - Both forms use the Better Auth React client (`authClient`) and redirect to `/dashboard` on success.

- **Protected routes**
  - Any page under `src/app/(protected)`:
    - Checks the session on the server:

      ```ts
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session) redirect("/login");
      ```

    - Uses `LogoutButton` (`src/components/logout-button.tsx`) to sign out and redirect back to `/login`.

---

## Styling & UI

- **Tailwind CSS v4** with shadcn theme (`@/app/globals.css`).
- **shadcn UI components** in `src/components/ui/`:
  - `button`, `field`, `input`, `textarea`, `dialog`, `sonner`, etc.
- Forms in the posts CRUD use:
  - `react-hook-form`
  - `@hookform/resolvers/zod`
  - shadcn `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Input`, `Textarea`.

---

## Notes

- This starter is opinionated but intentionally minimal.
- You can extend:
  - More Elysia routes under `src/app/api/[[...slugs]]/route.ts`.
  - More protected/public pages under the existing route groups.
  - The posts example into a richer blog or dashboard module.

