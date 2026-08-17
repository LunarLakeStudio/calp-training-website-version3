# Link homepage course rows to the Courses page

Each row in "Explore our courses" becomes a link to that course's card on the Courses catalogue page, while the "+" control keeps working exactly as it does now.

## Behaviour

- Clicking the row (title or anywhere on the card except the "+") navigates to `/courses#<course-slug>` — e.g. `/courses#cva-the-fundamentals`.
- Clicking the "+" only expands/collapses the preview on the Homepage. No navigation.
- Hover-to-reveal on desktop and tap behaviour of the "+" stay as they are.
- The existing "Learn more →" link inside the expanded panel keeps going to the full course page (`/courses/<slug>`).

## Courses page arrival

- On load with a hash, the page scrolls smoothly to the matching course card (offset for the sticky header so the card isn't hidden underneath).
- The matched card is highlighted for a few seconds: a dark-blue ring plus the existing pale soft red surface tint, then it fades back to normal. No new colours.
- If a filter would hide the target course, filters are left cleared on arrival so the card is always present.
- Works from any page and on mobile: same hash URL, same scroll/highlight logic, since it runs on the route rather than in the homepage component.

## Visual design

No changes to layout, spacing, typography, colours or the accordion design. The highlight uses existing tokens only.

## Technical notes

- `src/components/site/CourseAccordionList.tsx`: wrap the row title area in a `<Link to="/courses" hash={course.slug}>` and move the "+" out of the navigating element into its own `<button>` with `aria-expanded` and `stopPropagation`, so the accessibility semantics stay (link for navigation, button for expand). Keyboard: Tab reaches both; Enter on the link navigates, Enter/Space on the button toggles.
- `src/routes/courses.tsx`: read the hash with `Route.useLocation()`/`useLocation`, and in an effect after courses load, `document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" })` with a scroll-margin-top utility on the card wrapper; set a `highlightedId` state cleared by a timeout.
- `src/components/site/CourseCard.tsx` (or its wrapper in `courses.tsx`): accept `id={course.slug}` and an optional `highlighted` flag for the ring class. Preferred: add the `id`/`scroll-mt` on the `AnimatedGridItem` wrapper in `courses.tsx` so `CourseCard` needs only the highlight prop.
- No data, query or server-function changes.
