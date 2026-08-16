# Homepage bottom row: mix current and previous designs

Only the three-column row (Courses / Upcoming trainings / Meet our trainers) changes. Hero, navigation, How to apply, footer, data queries and other pages stay untouched.

## Explore our courses — unchanged

Keeps the compact expandable rows with the "+" control, current styling and the "View all courses" link.

## Upcoming trainings — back to the previous layout

- Show the next 3 trainings only (instead of 6).
- Each one stays a clean horizontal row: date block on the left, title plus location/type/language in the middle, red Apply button on the right.
- "View full calendar" link stays beside the heading.

## Meet our trainers — back to the previous layout

- Show 3 featured trainers side by side with larger square portrait photos.
- Under each photo: name in dark blue, languages and location.
- "View all trainers" link stays beside the heading.

## Layout

- Three columns in one row, top-aligned: Courses widest on the left, Trainings centre, Trainers right.
- Trainings and Trainers columns sit at the top of their column with no forced stretch, so the shorter columns don't create large empty gaps.
- On smaller screens the sections stack in order: Courses, Upcoming trainings, Trainers.
- Existing CALP colours, typography, buttons and spacing only.

## Technical notes

- `src/routes/index.tsx`: trainings slice 6 → 3, trainers slice 8 → 3; swap the trainers column from the vertical `TrainerRow` list to a 3-across grid of the existing `TrainerCard`; add `items-start` to the section grid.
- `TrainerRow.tsx` is left in place but no longer used on the homepage; `TrainerCard.tsx` and `TrainingRow.tsx` are reused as-is.
