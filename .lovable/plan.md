# Trim the homepage trainings and trainers lists

- Upcoming trainings: show 6 instead of 10 (drop the last 4 rows).
- Meet our trainers: show 8 instead of 10 (drop the last 2 rows).
- Courses column, hero, How to apply, header and footer stay exactly as they are.

## Technical notes

- `src/routes/index.tsx`: change the trainings slice/limit from 10 to 6 and the trainers slice from 10 to 8. No other edits.
