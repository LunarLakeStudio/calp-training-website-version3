# Calendar page: compact drop-down filters

Bring the Calendar page filters in line with the Find a Training section, without changing any filtering behaviour.

## Changes

1. **Title** — hero title becomes "Training Calendar" (Calendar capitalised). Head/meta text already reads "Training Calendar", so no metadata change is needed.

2. **Filters → drop-downs** — replace the four chip rows with a compact grid of four drop-downs, matching the Find a Training layout exactly:
   - Country → placeholder "All Locations"
   - Course → placeholder "All Courses"
   - Language → placeholder "All Languages"
   - Month → placeholder "All Months"
   Same white card, same 12px bold Dark Blue labels, same 40px-high triggers, stacked on mobile and 4 across on desktop.

3. **Reset filters** — Dark Blue outlined "Reset filters" button with the same circular-arrow icon, shown only when at least one filter is active; clears all four.

## Unchanged

- All four filter categories, their option lists, and the filtering logic.
- Month grouping of results, the training rows, counts and empty/loading states.
- Everything else on the page and all other pages.

## Technical notes

- Edit `src/routes/calendar.tsx` only.
- Reuse the same shadcn `Select` composition and a local `FilterSelect` helper identical to the one in `src/routes/trainings.tsx` (sentinel value `"all"` maps to `null`).
- Month options keep their existing `YYYY-MM` values with "Month YYYY" labels (full month name in the drop-down instead of the 3-letter chip abbreviation).
- Drop the now-unused `FilterChip` / `FilterGroup` usage from this route; the shared `FilterChip` component stays in place for any other consumers.
