# Switch red text and buttons to Dark Blue

## What changes

Everywhere CALP Red `#CA2128` is currently used for **text** or **buttons**, it becomes Dark Blue `#065B82`:

- Page headings (H1/H2/H3) on the home page and all sub-pages — courses, trainings, trainers, calendar, apply, contact, course and training detail pages.
- Inline red text: labels, emphasised copy, active navigation links, footer links, error/required-field hints, small eyebrow/badge text.
- Primary buttons (currently red with white text) become Dark Blue with white text, including "Find a training", "Apply for this training", form submit buttons and the numbered step markers in "How to apply".
- Hover/active states that turned red now turn Dark Blue (or stay pale on the dark navigation bar, which already uses pale red for its active state).

## What stays red

Decorative-only uses keep CALP Red, since they aren't text or buttons:

- The organic brand shapes in hero sections and the bottom band.
- Pale red / pale red soft background tints (badge pills, the "How to apply" band background).

If you'd prefer the decorative shapes and pale tints to change too, say so and that can be folded in.

## Technical notes

- Bulk-replace `text-calp-red` with `text-calp-blue` and `bg-calp-red` with `bg-calp-blue` (plus `border-calp-red`, `group-hover:text-calp-red`, `hover:text-calp-red`, `ring-calp-red`) across `src/routes/*` and `src/components/site/*`.
- Leave `--calp-red` in `src/styles.css` defined — the token is still used by `BrandShapes.tsx` and the pale tints.
- Where Dark Blue text would sit on the Dark Blue navigation bar or a dark surface, keep the existing white/pale treatment so contrast stays accessible.
- Verify with a typecheck and a browser pass over the home, courses, trainings, trainers, calendar and apply pages.
