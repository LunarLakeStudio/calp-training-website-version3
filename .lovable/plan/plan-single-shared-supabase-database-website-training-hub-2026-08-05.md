# Plan: Single shared Supabase database (Website + Training Hub)

## Decision

Both the **CALP Training Website** (this project) and the **CALP Training Hub** connect to the **same** Supabase project (`gyvfccrflinrxdxyssfz`). No second database, no scheduled sync. The Hub remains the source of truth; the Website reads public data from it directly and writes applications back to it.

This architecture is **already implemented** in the current code. This plan confirms it, removes the (never-built) sync design, unblocks live data, and adds light hardening.

## Current state (already built — no rewrite needed)

- `src/integrations/supabase/shared.server.ts` — server-only Supabase client using `SHARED_SUPABASE_SERVICE_ROLE_KEY` (service role, bypasses RLS). Browser never touches the DB.
- `src/lib/content.server.ts` — fetchers for courses / trainers / trainings, filtering to public-safe fields and projecting only the columns the UI needs.
- `src/lib/submissions.server.ts` — writes applications to `participants` and enquiries to `contact_enquiries`, server-side only.
- `src/lib/submissions.functions.ts` — RPC wrappers (`submitApplication`, `submitEnquiry`).
- `src/routes/apply.tsx` — full application form (Q1–Q19) with cascading Course → Training → Trainer dropdowns; payload sent server-side.
- No anonymous RLS grants are required, matching your earlier decision: website visitors never get direct DB access.

## Steps

### 1. Unblock: configure the correct service role key  *(you, prerequisite)*

The current `SHARED_SUPABASE_SERVICE_ROLE_KEY` is rejected as "Invalid API key". Replace it with the Hub project's `**service_role**` secret:

- Supabase Dashboard → the Hub project → *Settings → API → `service_role` secret key* (or reveal `SUPABASE_SERVICE_ROLE_KEY` in the Hub's Lovable Cloud → Secrets).
- It must be the secret value, not the publishable/anon key. Format is either `eyJhbGciOi...` (legacy JWT) or `sb_secret_...` (new opaque key).
- Save it via the secure secret form (replace `SHARED_SUPABASE_SERVICE_ROLE_KEY`). Do not paste it into the codebase.

Once saved, I'll verify live reads work (courses/trainers/trainings load, applications insert).

### 2. Verify the Hub schema supports for now the 10 course-specific forms  *(me, after the key works)*

- Confirm the `participants` table has an `answers jsonb` column. The submit code already falls back to inserting without it if missing, but for 9 distinct forms the `answers` column is what stores course-specific Q&A — so each course can have its own question set without repeated schema migrations.
- Confirm the Hub has the **10 courses** (8 popular + 2 rarely run) the Website should surface.
- Report any schema gaps; provide a small SQL migration you can run on the Hub DB if the `answers` column or any needed column is missing. The number of courses might increase in the future - when new courses will be created. However, the total number of courses will be relatively low, maybe up to 20 courses. It's number of Trainings will be higher as there are multiple Trainings for the same Course. For each Course there is a special Application Form and Evaluation Form. 

### 3. Hardening: read only public columns (defense in depth)  *(me — DONE)*

The service role bypasses RLS, so fetchers previously `select("*")` and then projected safe fields in code. Tightened so private columns (trainer email/assessment/internal status, trainings `application_token`/`created_by`, application PII) are never pulled into the server process at all:

- `fetchTrainers`: explicit public columns only (`id, first_name, last_name, country, organisation, photo_path, lang_*, other_language, share_on_website`) — never `email`, `comments`, `status`, `user_id`, etc.
- `fetchCourses` / `fetchTrainings` / `fetchTraining`: named public columns only; no `*`.
- Narrowed `TrainerRow` / `TrainingRow` types so the mappers cannot reference private fields at compile time.
- Applications remain write-only from the Website; the site never reads `participants` rows.

### 4. Build the first course-specific application form  *(me, awaiting your form spec)*

- Reuse the existing `apply.tsx` structure and the `answers` payload.
- Implement the first course's question set exactly as numbered in the form you provide; store course-specific answers under `answers` keyed by question id.
- Generalize so the remaining 8 forms can be added by defining each course's question config without touching the submit layer.

## What we are NOT doing

- No second Supabase project, no scheduled sync, no API-forwarding layer for reads.
- No anonymous/public RLS grants on Hub tables (website visitors never hit the DB directly).
- No public views / anon policies now (optional future hardening; not needed while reads stay server-side with the service key).

## Prerequisite on you

Provide the correct Hub `service_role` key via the secure secret form. Everything else I can do once it works.