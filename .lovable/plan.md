# Trainings page: show 3 rows, then "Load More Trainings"

## What changes for visitors

- The Find a Training page shows only the first 3 rows of training cards (9 cards) instead of the full list.
- A "Load More Trainings" button sits beneath the grid and reveals the next 3 rows (9 more) on each click.
- The button disappears once every matching training is shown.
- Changing any filter or resetting filters snaps the list back to the first 9 results.
- The counter still reports the full number of matches, in the same "Showing X of Y" style used on Find a Trainer.

## Technical notes

- File: `src/routes/trainings.tsx` only. No data-layer or server changes: trainings already load in one client-side query (`useTrainings`), so batching is a display-level slice, matching what the Trainings grid already has in memory.
- Add `const [visible, setVisible] = useState(9)` and render `results.slice(0, visible)` in the existing `AnimatedGrid` (3-column desktop layout, so 9 = 3 rows).
- Reset `visible` to 9 whenever the active filter combination changes (reuse the existing `filterKey` in an effect, and in `resetFilters`).
- "Load More Trainings" button styled like the Trainers page button (`bg-calp-red`, white bold text, rounded-lg), shown only when `visible < results.length`. No spinner needed since no fetch occurs.
- Cards, filters, empty state, and animations stay unchanged.
