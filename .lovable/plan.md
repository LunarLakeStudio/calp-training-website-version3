# Balance the homepage columns: more trainings and trainers

Goal: the three homepage columns ("Explore our courses", "Upcoming trainings", "Meet our trainers") end at roughly the same height. The courses column now runs 10 rows, so the other two grow to match.

## Upcoming trainings

- Show the next 10 trainings instead of 3, stacked in the same one-per-row style already used.
- Keep the existing row design (date block, training name, location/type, Apply button) unchanged.
- "View full calendar" link stays.

## Meet our trainers

- Replace the 3-across mini card grid with a single vertical column of 10 trainers, one per row, so it reads like the other two columns.
- Each row: small round photo on the left, name in dark blue, and location/languages beneath in body text — compact, left-aligned, same tokens and card styling as today.
- "View all trainers" link stays.

## Notes

- Rows are trimmed so all three columns land within roughly the same vertical space; if the trainings list runs short (fewer than 10 future dates in the data), it simply shows what is available.
- No other homepage section changes: hero, How to apply, header and footer untouched.

## Technical notes

- `src/routes/index.tsx`: raise the slices from 3 to 10 for trainings and trainers.
- Trainer column: render a compact vertical list (a small `TrainerRow` presentation block alongside the existing `TrainerCard`, which stays in use on the Trainers page).
- Existing colour/typography tokens only; no new colours or fonts.
