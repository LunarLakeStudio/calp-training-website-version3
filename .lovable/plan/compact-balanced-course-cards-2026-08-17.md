# Compact, balanced course cards

Rebalance the course cards on the Courses page so the abstract artwork becomes a slim
banner and the course information carries the visual weight.

## What changes

- **Image band**: fixed height instead of a 16/10 aspect ratio — 128 px on desktop,
  112 px on tablet, 120 px on mobile. Identical for every card, artwork centred with
  `object-cover object-center` so nothing crops awkwardly.
- **Title**: stays below the image on the white area, reserved at exactly two lines
  (clamped, fixed min-height) so every card's title block matches.
- **Description**: reserved at exactly three lines (clamped, fixed min-height).
- **Footer row**: duration, languages and the arrow button pinned to the bottom of the
  card via the existing flex column, so they sit on the same baseline in every card.
- **Equal card height**: cards stretch to full grid-row height (the grid already places
  one card per cell), so all three cards in a row end at the same point.

Unchanged: three-column desktop grid, colours, typography, copy, links, highlight
behaviour on hash navigation, hover animation.

## Technical notes

- Only `src/components/site/CourseCard.tsx` is touched (Tailwind classes only):
  swap `aspect-[16/10]` for `h-[120px] sm:h-28 lg:h-32`, add `line-clamp-2` plus a
  two-line min-height on the `h3`, keep `line-clamp-3` with a three-line min-height on
  the summary, and reduce padding slightly for a more compact card.
- If needed for full-height stretch, add `h-full` on the wrappers in
  `src/routes/courses.tsx` grid items — no logic or data changes.
