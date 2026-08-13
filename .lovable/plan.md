# Calendar page: training cards with Apply buttons

## What changes

The Calendar page currently lists each training as a thin horizontal row. It will instead show the same card design used on the Find a Training page, still grouped under month headings.

Each card shows:
- Training type, language and topic badges (same badge styling as Trainings)
- Training name (course title) as the card heading
- Start – end dates
- City, country
- Trainer
- Application deadline ("Apply by …"), shown only when a deadline exists
- Two actions: a secondary "Details" link and a prominent primary "Apply for this Training" button in CALP Red

The Apply button goes to the application form with that specific training preselected (`/apply?training=<id>`), which the form already supports — course, trainer language filtering and session details fill in automatically.

Month grouping, filters, reset filters, counts, empty and loading states stay exactly as they are.

## Layout

- Mobile: one card per row
- Tablet: two per row
- Desktop: three per row
- Cards stretch to equal height with the action buttons pinned to the bottom, so rows stay aligned.

## Technical notes

- Extract the card markup currently inline in `src/routes/trainings.tsx` into a shared `src/components/site/TrainingCard.tsx` with an optional prop for the primary button label (`Apply` on Trainings, `Apply for this Training` on Calendar) so both pages stay in sync.
- `src/routes/trainings.tsx` renders the new component in place of its inline `<article>`.
- `src/routes/calendar.tsx` replaces `TrainingRow` inside each month group with a responsive grid of `TrainingCard`.
- Deadline line renders conditionally so trainings without a deadline don't show an empty value.
- `TrainingRow` stays in place for other pages that use it.
