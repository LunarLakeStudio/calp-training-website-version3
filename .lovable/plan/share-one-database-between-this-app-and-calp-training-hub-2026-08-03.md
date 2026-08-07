# Share one database between this app and CALP Training Hub

I found the other project ("CALP Training Hub") in your workspace and read its Cloud database. This plan connects this public site to that **same** database so both apps run on one source of truth — no copy/paste of credentials needed.

## What I confirmed (by reading the other project)

- Other project has Lovable Cloud enabled. Its Supabase project:
  - URL: `https://gyvfccrflinrxdxyssfz.supabase.co`
  - Project ref: `gyvfccrflinrxdxyssfz`
  - Publishable (anon) key: present (read from the other project's config)
  - Service-role key: NOT pulled — this site will use the publishable key only, so all access runs as the anonymous public role under RLS. No privileged key in this app.
- Real schema (already populated by the other app): `courses`, `trainings`, `trainers`, `participants` (= applications), `course_formats`, `course_forms`, `course_materials`, `course_languages`, `certificates`, `webinars`, plus auth tables (`profiles`, `roles`, `user_roles`).
- Existing RLS gates everything behind `authenticated` / `superadmin` (the other app is an admin tool with sign-in). There is **no** anon read access and **no** general contact-enquiries table today.

## How the two apps share

Both apps point at the same Supabase URL + publishable key. The other app writes data as signed-in admins/trainers; this public site reads it anonymously and writes applications + enquiries anonymously. One database, two front-ends.

## What I'll build

### 1. Connect this project to the shared database
- Add the shared `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` (and the `VITE_` copies) as secrets to this project.
- Replicate the other project's generated client into `src/integrations/supabase/client.ts` + `types.ts` (same `Database` types), so this app speaks the same typed schema. No Cloud enable on this project (that would make a second, empty DB).

### 2. Minimal shared-DB migration (I'll show it for your approval before running)
Because the other app's RLS blocks anon, I need to add narrow public policies to the **shared** database. Proposed additions only — no changes to existing tables/columns:
- `courses`: anon SELECT (all rows are public catalogue entries).
- `course_languages`, `course_formats`, `course_forms`, `course_materials`: anon SELECT (so course detail can show languages, formats, downloadable materials).
- `trainers`: anon SELECT **only where `share_on_website = true`** (the other app already has this flag).
- `trainings`: anon SELECT **only where `status IN ('open','live')`** (upcoming/public sessions — not cancelled/completed private ones).
- `participants`: anon INSERT only (applications), no SELECT/UPDATE/DELETE — submitted personal data stays private. New rows default `status = 'applied'`.
- New `contact_enquiries` table: anon INSERT only (name, email, subject, message, created_at). No public read.
- `storage.objects` trainer-photos bucket: anon SELECT (so trainer photos render publicly).
I will list the exact SQL and confirm with you before applying anything to the shared database, since the other app depends on it.

### 3. Read paths (replace demo data with live data)
Thin adapter functions map the shared schema to the shapes this site already uses, so pages/components barely change:
- `courses` → title, description, objectives, tags (topics), `course_languages` (languages).
- `trainers` → first/last name, country, `lang_*` booleans → languages array, `photo_path` → photo URL, `share_on_website` filter.
- `trainings` → course_id, city, country, start/end_date, language, trainer_id (join `trainers` for name), modality (format), application_deadline, status filter to public.
- Pages updated: Courses + Course detail (with `course_materials` downloads and upcoming trainings list), Trainers, Trainings + Training detail, Calendar (country/course/month/language filters), Home highlights. Each uses TanStack Query with loading/empty states; existing filters and animations keep working.
- `src/data/*.ts` demo files stay as a fallback only while pages are switched over, then removed.

### 4. Write paths
- Apply form (Q1–Q19) → `createServerFn` that inserts a `participants` row linked to the chosen course/training/trainer. Keeps existing validation, field numbering, and success toast.
- Contact form → inserts a `contact_enquiries` row.
- Both run as anon under the new INSERT-only policies.

### 5. No sign-in on this site
Per your answer, no auth UI here. All reads are anon SELECT; all writes are anon INSERT. The other app still owns admin/auth.

## Technical notes
- Reads in route loaders / `useSuspenseQuery`; writes through `createServerFn` in `src/lib/*.functions.ts`.
- Publishable key only — never a service-role key in this app.
- Trainer photos served from the shared storage bucket via public URLs.
- Date formatting stays via the existing `formatDate` helper.

## Open item for you
The one migration touches the **shared** database the other app runs on. I'll paste the exact SQL here for your OK before applying it. If you'd rather I apply it directly, say so and I will.
