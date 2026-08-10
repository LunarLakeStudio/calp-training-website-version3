# Render the provided shapes exactly as the brand files do

The "tail" is not in `15.svg` — it is our rendering bug. Each uploaded SVG draws its path inside a `clipPath` that crops it to the `0 0 375.12 225` frame, and every path overflows that frame:

| Source | Clip rect (y) | Path extends to y |
| --- | --- | --- |
| `3.svg` (oval) | 18.7 – 224.0 | ~371 |
| `2.svg` (round) | 37.3 – 224.0 | ~337 |
| `15.svg` (wave) | 0 – 224.0 | ~345 |

`src/components/site/BrandShapes.tsx` widened the viewBox to `-70 -20 480 400` and dropped the clip, so parts the brand files hide are now drawn — including the spur around y≈277–320 in `15.svg` that reads as a tail. The shapes themselves are correct; only the framing is wrong.

## Changes

`src/components/site/BrandShapes.tsx`
- Restore the source framing: `viewBox="0 0 375.12 225"`, matching the uploaded files, instead of the widened box.
- Give each shape its own clip rectangle, taken verbatim from its source `clipPath`, and wrap its path in that clip. Every silhouette then shows exactly the visible portion the brand file shows — nothing invented, nothing cropped differently.
- Per-shape clip data lives beside each path constant so the two can never drift apart. Clip IDs are made unique per rendered instance so multiple shapes on one page don't collide.
- Drop the arbitrary per-instance `rotate` transforms on the shapes that relied on the extra viewBox padding, since rotating a clipped silhouette would slice its edges. Cluster variety comes from size and offset instead.

## Unchanged

- All three provided shapes stay in use (`oval`, `wave`, `round`); nothing is removed or substituted.
- Palette: fills still reference `var(--calp-*)` only, CALP Red present in both clusters.
- Transparency: same `fill-opacity` values, so overlap blending is unchanged.
- Hero framing (`src/routes/index.tsx`) and the bottom "How to apply" band (`src/components/site/HowToApply.tsx`) keep their existing positions, sizes and z-order; shapes stay decorative, behind content, `aria-hidden`.
- No layout, data or logic changes.
