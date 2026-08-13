# Compact drop-down filters on the Trainings page

Update the Find a Training page UI only. All filter logic, categories and results stay exactly as they are.

## Changes

1. **Title**: "Find a training" becomes "Find a Training".
2. **Filters**: replace the five rows of chips with five compact drop-downs in one responsive row:
   - All Topics
   - All Courses
   - All Locations (country)
   - All Languages
   - All Training Types (format)
3. **Reset filters**: a Dark Blue text button next to the drop-downs, visible/enabled only when at least one filter is active; clears all five back to "All".
4. **Layout**: drop-downs sit in the existing white card. Grid stacks full-width on mobile, two columns on tablet, five across on desktop, with the reset control on its own line on small screens. Each drop-down carries a small label above it in the existing 12px bold Dark Blue style.
5. Result count line, cards, empty state and animations stay unchanged.

## Technical notes

- File: `src/routes/trainings.tsx`. Use the existing shadcn `Select` from `@/components/ui/select` (already present); Radix Select handles keyboard and touch correctly.
- Keep the same `useState` values (`topic`, `country`, `courseId`, `language`, `format` as `string | null`) and the same `useMemo` filter chain. Map the "All" option to a sentinel value `"all"` in the Select and convert to `null` in the change handler, since Radix Select cannot use an empty string value.
- Style the trigger/content with existing CALP tokens (border `calp-blue/15`, text `calp-ink`, focus ring Dark Blue) — no new colours, no new fonts.
- Course option labels keep the existing truncation for long titles.
- `src/components/site/FilterChip.tsx` stays in place (used elsewhere/harmless), but is no longer imported by this route.
