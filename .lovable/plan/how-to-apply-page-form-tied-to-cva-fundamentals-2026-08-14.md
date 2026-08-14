# How to apply page + form tied to CVA Fundamentals

## What changes

**1. New "How to apply" page**

A new page at `/how-to-apply` holds the supplied guidance text, in CALP styling (page hero, Dark Blue headings, black body copy, left-aligned):

- Heading: "How to apply for a CALP Network CVA training"
- Four paragraphs: browse and select a training; complete and submit the form before the deadline; review by the CALP training team and email decision; note that applying does not guarantee a place and to check spam/junk folders.

The existing three-step "How to apply" band on the homepage keeps its layout; its "See application guidance" button now points to this page.

**2. Application form removed from the navigation**

- The header nav item "How to apply" points to `/how-to-apply` instead of the form.
- The application form keeps living at `/apply`, but it is no longer linked from the main navigation — users reach it only through Apply buttons.

**3. Apply buttons keep working, and preselect the training**

- All existing Apply buttons stay in place on the Trainings page, Calendar page, training detail page and homepage rows (more course forms are coming later).
- Each Apply button now passes the training it belongs to, so the form opens with that training and its course already selected. For any CVA – The Fundamentals training this opens the existing form pre-set to that course.

## Technical notes

- New route file `src/routes/how-to-apply.tsx` with `createFileRoute("/how-to-apply")`, own `head()` (title, description, og:title, og:description), single H1, `PageHero` + prose sections.
- `src/i18n/dict.ts`: `nav.apply` label stays "How to apply"; `SiteHeader.tsx` nav item `to` changes to `/how-to-apply` (desktop and mobile menus).
- `HowToApply.tsx` CTA link → `/how-to-apply`.
- `TrainingCard.tsx`, `TrainingRow.tsx` and the Apply button on `trainings.$trainingId.tsx` gain `search={{ training: <training id> }}` on their `<Link to="/apply">`; `/apply` already accepts a `training` search param and derives the course from it, so no form logic changes.
- `/apply` route itself is untouched apart from remaining reachable by direct link.
