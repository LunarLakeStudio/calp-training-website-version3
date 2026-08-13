# Explore Our Courses — vertical accordion list

Rework only the "Explore our courses" block on the homepage. The Upcoming trainings, Meet our trainers, hero and How to apply sections stay exactly as they are.

## What it will look like

- All 10 courses stacked in a single vertical column, one per row, top to bottom — never side by side.
- Each row is a CALP-styled card (white surface, rounded corners, thin dark-blue border, generous padding) separated by a small gap so each course reads as its own shape.
- Collapsed state (default for every row): course title only, left-aligned, in a size clearly smaller than the "Explore our courses" heading, plus a small "+" icon on the right in dark blue.
- Revealed state: the short course summary plus a "Learn more" link to that course's page, sliding open smoothly beneath the title. The icon rotates to a minus/arrow and the card gets a subtle background/border shift.
- Desktop: hovering a row reveals it. Tablet/mobile: tapping the row toggles it.
- Only one row open at a time — opening another closes the previous one.
- Keyboard: each row is a real button, focusable with Tab, toggled with Enter/Space, with a visible focus ring; open state announced via `aria-expanded`. Focus-opening behaves the same as hover.

## Layout

The courses block currently sits in a three-column homepage row with 3 featured cards. It keeps its column position and its "View all courses" link; the 3-card image grid is replaced by the 10-row list. The row heading and the trainings/trainers columns are untouched.

## Technical notes

- New component `src/components/site/CourseAccordionList.tsx`: takes `courses`, holds one `openId` state, renders each course as a `<button aria-expanded>` header plus a collapsible panel (grid-rows / max-height transition so it animates without layout jank). Mouse enter/leave sets `openId` only on pointer-capable widths (`(hover: hover)` media query via `matchMedia`), so touch devices rely on tap.
- `src/routes/index.tsx`: use the full `allCourses` list instead of `.slice(0, 3)` for this block and render the new component; no other change.
- Existing `CourseCard` stays in place for the Courses catalogue page.
- Colours/typography reuse existing tokens only (`text-calp-blue`, `border-calp-blue/10`, `bg-calp-pale-red-soft` for the open/hover surface). No new colours or fonts.
