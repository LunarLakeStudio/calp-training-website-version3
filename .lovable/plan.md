# Change "How to apply" section background to #f7e4db

## Goal
Change only the background of the bottom "How to apply" band on the Home page from the current Pale Red (`#f0cdbf`) to a lighter custom value `#f7e4db`.

## Scope (important)
The shared token `--calp-pale-red` (`#f0cdbf`) is used in 7 places — badges in `trainings.tsx`, callout boxes in `apply.tsx`, chips in `PageHero.tsx` and `AnimatedPageHero.tsx`, a decorative shape fill in `BrandShapes.tsx`, and the HowToApply section. **We must NOT change the shared token**, because that would also recolour all those other surfaces. The change is scoped to the HowToApply band only.

## Approach
Add a new dedicated CSS token for this lighter tint and apply it only to the HowToApply section background, so all other pale-red surfaces stay untouched.

1. **`src/styles.css`**
   - Add a new token `--calp-pale-red-soft: #f7e4db;` in the `:root` block (after `--calp-pale-red`, ~line 59).
   - Register it in `@theme inline` as `--color-calp-pale-red-soft: var(--calp-pale-red-soft);` so the `bg-calp-pale-red-soft` utility is generated.

2. **`src/components/site/HowToApply.tsx`** (line 26)
   - Change `bg-calp-pale-red` → `bg-calp-pale-red-soft` on the `<section>`.

No other files change. The decorative `ShapeClusterCool` / `ShapeClusterWarm` shapes layered on top of the band keep their current fills and opacities — they were tuned against the warmer `#f0cdbf`, so I will verify the result in the preview and nudge opacity if the contrast against the lighter background looks off.

## Verification
- Screenshot the bottom of the Home page in the preview to confirm the band is the lighter `#f7e4db` and the shapes still read well on it.
- Confirm no other pale-red surface (course badges, apply-page callouts, hero chips) changed colour.
