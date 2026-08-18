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

## Technical notes

- `src/components/site/TrainingHubButton.tsx`: change the `variant="button"` styles from white/bordered to `bg-calp-blue text-white`, align padding/radius/icon size with the footer's red anchor, add a focus-visible ring, and keep the disabled placeholder branch using the same shape.
- `src/components/site/SiteFooter.tsx`: use `variant="button"` for the Training Hub control, remove the divider `<span>`, adjust the flex gap/wrapping and column alignment.
- `src/config/site.ts` unchanged — `TRAINING_HUB_LOGIN_URL` stays the single place to set the destination.
