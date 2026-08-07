# Close the database to the public, serve content through the site's server

The shared CALP Training Hub database stays private: no anonymous read or write access to `courses`, `trainers`, `trainings` or `participants`. The public website reads content on the server with a secret key and always reflects whatever the Hub currently holds — no manual website updates. Participant applications are submitted through the site's own server, which validates and writes the row.

## What changes for visitors

- Courses, Trainers, Trainings and Calendar pages show live Hub data, rendered server-side.
- Application forms keep working exactly as they do now; the submission just travels via the site's server instead of straight to the database.
- Contact enquiries follow the same server-side path.

## Technical approach

**1. Secret key**
Add a project secret holding the shared project's service key (`SHARED_SUPABASE_URL`, `SHARED_SUPABASE_SERVICE_ROLE_KEY`). Server-only; never bundled into browser code.

**2. Server-only Supabase client**
New `src/integrations/supabase/shared.server.ts` creating a client from those env vars (opaque-key `apikey` header handling reused from the current client). Only imported from inside server-function handlers via `await import(...)`.

**3. Read layer moves to server functions**
- `src/lib/api.ts` keeps all mapping/derivation logic but stops importing the browser client; it exports pure mappers plus fetchers that take a client.
- New `src/lib/content.functions.ts` with `createServerFn` GET functions: `getCourses`, `getCourseBySlug`, `getCourseById`, `getTrainers`, `getTrainings`, `getTrainingById`, `getCalendarEntries`.
- Routes (`courses`, `courses.$courseId`, `trainers`, `trainings`, `trainings.$trainingId`, `calendar`, `index`, `apply`, `sitemap[.]xml`) load through route loaders + TanStack Query (`ensureQueryData` / `useSuspenseQuery`), replacing the current browser-side `useData` hooks. Each loader route gets `errorComponent` and `notFoundComponent`.
- Filtering stays client-side on the already-loaded lists, so the current filter UX is unchanged.

**4. Writes move to server functions**
- `src/lib/applications.functions.ts`: `submitApplication` (Zod-validated: course, training, trainer, Q1–Q19 identity fields + `answers` JSON) and `submitEnquiry`.
- `apply.tsx`, `trainings.$trainingId.tsx` and `contact.tsx` call these instead of `supabase.from(...).insert(...)`.
- Basic abuse protection: server-side field validation, length caps, and a check that the referenced training exists.

**5. Remove public exposure**
- Delete `src/integrations/supabase/client.ts` (browser client) and its remaining imports, so the publishable key and database URL leave the client bundle entirely.
- No anon RLS policies or GRANTs are needed on the shared database — the earlier SQL script for public read/write is dropped.

## What you need to provide

The service key for the shared project (`gyvfccrflinrxdxyssfz`) — from the Hub project's API settings. Everything else is handled here.

## Not included

- No snapshot/sync endpoint or scheduled publish step; reads are live.
- Email notifications to `training@calpnetwork.org` remain a separate, later step.
