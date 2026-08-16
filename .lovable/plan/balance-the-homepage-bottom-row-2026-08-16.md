# Balance the homepage bottom row

Only the three-column row (Courses / Upcoming trainings / Meet our trainers) changes.

## Upcoming trainings

- Show 6 trainings instead of 3, using the same horizontal row design (date block, title, location/type/language, red Apply button).
- "View full calendar" link stays.

## Meet our trainers

- Show 6 trainers instead of 3: two rows of three portrait cards, same card design and spacing as now.
- "View all trainers" link stays.

## Layout

- Three columns stay top-aligned in one row; the added rows bring the trainings and trainers columns closer in height to the 10-row courses list.
- Small screens keep stacking in order: Courses, Upcoming trainings, Trainers.
- No changes to hero, navigation, How to apply, footer, data queries or other pages.

## Technical notes

- `src/routes/index.tsx`: trainings slice 3 → 6, trainers slice 3 → 6; trainer grid keeps `grid-cols-3` so it wraps to two rows.
