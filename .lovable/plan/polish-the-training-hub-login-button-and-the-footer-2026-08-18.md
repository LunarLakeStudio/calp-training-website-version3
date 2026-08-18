# Polish the Training Hub Login button and the footer

## The button

`Training Hub Login` becomes a solid **Dark Blue `#065B82`** button with white label and white lock icon — a matched pair with the red **Visit CALP Network ↗** button next to it.

- Same shape as the red button: same radius, same horizontal padding, same font weight and size, `whitespace-nowrap`.
- Lock icon at the same size as the red button's arrow icon, so the two read as siblings.
- Hover: subtle opacity lift, identical to the red button's treatment. Visible keyboard focus ring.
- Contrast: white on Dark Blue passes AA.

### While the URL is unknown

The destination in `src/config/site.ts` is still an empty placeholder, so nothing links to a dead address. In that state the button renders in the same Dark Blue shape but muted and non-clickable, with a small "Coming soon" hint on hover and `aria-disabled`. The moment you supply the real URL in that one config value, it becomes a live link opening in a new tab — no other change needed.

## The footer

Currently the middle column crams the red button, a thin vertical divider and the Training Hub link together, which is what makes the button look like an afterthought.

- Drop the vertical divider; the two buttons sit side by side with even spacing, vertically centred, both the same height.
- Buttons wrap cleanly to two stacked full-width buttons on narrow screens instead of squeezing.
- Slightly more breathing room above and below the button pair so the three footer columns (logo / actions / policy links) align on a common baseline.
- Policy links on the right keep their current styling but get consistent spacing so the row reads as one tidy band.
- The copyright strip below is unchanged.

No new colours, fonts or routes — only existing brand tokens (`calp-blue`, `calp-red`, white).

## Unify "How to apply" (homepage band vs. the page)

Right now the homepage band shows 3 steps with different wording ("Find a training / Complete the application / Receive confirmation") while `/how-to-apply` shows 4 ("Choose a training / Complete the form / Review and decision / Good to know"). They should read as the same process, one short and one full.

Approach: the four steps become a **single source of truth**, and the homepage band shows the first three of them with the same titles and short one-line summaries. "Good to know" is a caveat rather than a step, so it stays on the page only — and on the page it is presented as a distinct note card (not numbered "4"), so both surfaces genuinely agree on a **three-step process**.

Unified steps, used in both places:

1. **Choose a training** — Browse the calendar and pick a training that fits your needs.
2. **Complete the form** — Fill in the online application and submit before the deadline.
3. **Review and decision** — The CALP training team reviews it and emails you the outcome.

Plus, on the page only: a **Good to know** note card (no number, muted styling) with the existing "Submitting an application does not guarantee a place…" copy.

Visual consistency between the two:

- Same numbered circle treatment in both: Dark Blue filled circle with a white numeral (the page currently uses teal / blue / red / blue-50 circles, which conflicts with the band's all-blue numbering — the band's consistent version wins).
- Same step titles, same order, same sentence case, left-aligned.
- The page keeps its white rounded cards and hero; the band keeps its compact three-across layout with the chevron rhythm and the "See application guidance" button — so the band still reads as a teaser that leads to the full page.
- The page's step grid goes from 2×2 to three equal columns on desktop, mirroring the band, with the "Good to know" note as a full-width card underneath.

## Technical notes

- `src/components/site/TrainingHubButton.tsx`: change the `variant="button"` styles from white/bordered to `bg-calp-blue text-white`, align padding/radius/icon size with the footer's red anchor, add a focus-visible ring, and keep the disabled placeholder branch using the same shape.
- `src/components/site/SiteFooter.tsx`: use `variant="button"` for the Training Hub control, remove the divider `<span>`, adjust the flex gap/wrapping and column alignment.
- `src/config/site.ts` unchanged — `TRAINING_HUB_LOGIN_URL` stays the single place to set the destination.
- New `src/data/apply-steps.ts` exporting the three shared steps (`title`, `short`, `full`) plus the "Good to know" note; both `HowToApply.tsx` (uses `short`) and `routes/how-to-apply.tsx` (uses `full`) import it, so the two can never drift again.
- `HowToApply.tsx`: step titles/bodies come from the shared data; layout unchanged.
- `routes/how-to-apply.tsx`: drop the per-step `circle` colours in favour of `bg-calp-blue`, switch the grid to `md:grid-cols-3`, and render "Good to know" as an unnumbered note card below.

