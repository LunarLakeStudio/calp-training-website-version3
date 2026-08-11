# Typography compliance audit and fixes

Checked every route and site component against the CALP Typographic Hierarchy Guidelines. Roboto 400/500/700, red H1s, blue secondary headings, black body copy, left-ranged text and no letter-spaced/all-caps text are already in place. Nine deviations were found.

## What is already compliant

- Roboto only (400/500/700) loaded once in the root route; every element inherits it.
- H1 in CALP Red; H2/H3 in Red or Dark Blue; body copy black.
- No ALL-CAPS text strings anywhere; no letter-spacing utilities in page content.
- Headings are always larger than body copy; text is left-aligned by default.

## Deviations to fix

| # | Guideline | Where | Fix |
| --- | --- | --- | --- |
| 1 | Avoid italics | `src/routes/apply.tsx` line 364 ("Donor acknowledgement") | Remove `italic`; use Roboto Medium instead |
| 2 | Avoid underlining | `src/routes/apply.tsx` lines 720, 737, 747 — underlined section headings | Remove `underline decoration-2 underline-offset-4`; keep red bold headings, add a hairline rule below if separation is needed |
| 3 | Avoid underlining (standing links) | `src/routes/trainers.tsx` lines 71, 78 | Change permanent `underline` to `hover:underline` with `underline-offset-4`, matching the rest of the site |
| 4 | Body copy never below 12px (digital) | `text-[10px]` labels/badges in `trainings.tsx`, `trainings.$trainingId.tsx`, `trainers.tsx`, `courses.tsx`, `courses.$courseId.tsx`, `contact.tsx` | Raise all to `text-xs` (12px) |
| 5 | Consistent body size | `src/components/site/CourseCard.tsx` line 26 (`text-[13px]`) | Use `text-sm` so no ad-hoc sizes remain |
| 6 | No letter spacing | `src/routes/__root.tsx` line 51 (`tracking-tight`) | Remove the tracking class |
| 7 | Only three weights (400/500/700) | `font-semibold` (600) in `FilterChip.tsx`, `apply.tsx`, `contact.tsx`, `courses.$courseId.tsx`, `trainings.$trainingId.tsx`, `__root.tsx` | Replace with `font-medium` for UI labels and `font-bold` for emphasis |
| 8 | Range type left | Centred body paragraphs (loading/empty/404 states) in `trainings.tsx`, `trainers.tsx`, `courses.tsx`, `calendar.tsx`, `courses.$courseId.tsx`, `trainings.$trainingId.tsx`, `__root.tsx` | Left-align the copy; button label centring stays (labels, not copy) |
| 9 | Generous line spacing (type size + 4pt) | Headings using `leading-tight`/`leading-none` | Set headings to `leading-snug` and confirm body copy keeps `leading-relaxed` |

## Point left unchanged (flagging the conflict)

The guidelines say **large headlines should be title case**. Your earlier brand instruction for this site was **sentence case everywhere**, which is what the site currently uses (e.g. "Build the skills to deliver better CVA."). I am leaving headings in sentence case and not touching wording — say the word if you want H1/H2 switched to Title Case instead.

## Technical notes

Presentation-only changes: Tailwind class edits in `src/routes/*` and `src/components/site/*`. No content, data, or logic changes. Verification: grep `src/` for `italic`, `tracking-`, `font-semibold`, `text-[10px]`, and standing `underline` to confirm none remain, then screenshot the home, courses, trainings, trainers, apply and contact pages to check nothing shifts.
