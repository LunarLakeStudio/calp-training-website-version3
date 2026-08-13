# Courses page: compact drop-down filters

## What changes

The Courses page currently uses rows of chip buttons for Topic and Language. These are replaced with the same compact drop-down filters used on Find a Training and Calendar.

Filter panel layout (inside the existing white card):
- Search box stays exactly as it is, full width on top
- Below it, a responsive grid of drop-downs:
  - Topic — placeholder "All Topics"
  - Language — placeholder "All Languages"
- "Reset filters" button appears below the drop-downs whenever a filter or search term is active, clearing search, topic and language

No filter categories are added or removed and the filtering logic is unchanged — only the control format changes.

## Layout

- Mobile: drop-downs stacked full width
- Tablet and desktop: two drop-downs side by side, matching the spacing, label size and field height of the other two pages

## Technical notes

- Extract the `FilterSelect` helper currently duplicated in `src/routes/trainings.tsx` and `src/routes/calendar.tsx` into `src/components/site/FilterSelect.tsx`, and have all three pages import it so styling stays identical.
- `src/routes/courses.tsx` drops `FilterChip` / local `FilterGroup` usage in favour of `FilterSelect`, keeping `topic`, `lang` and `query` state and the existing `filtered` memo untouched.
- Reset button reuses the same markup as Calendar/Trainings (Dark Blue outline, `RotateCcw` icon, 12px bold label).
- `FilterChip` component file is left in place in case other pages use it.
