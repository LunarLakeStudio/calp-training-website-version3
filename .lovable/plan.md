# Replace flat circles with genuine organic SVG blobs

The decorative shapes on the homepage hero and the "How to apply" band are currently flat filled circles (`RedCircle`, `TealCircle`, `PaleTealCircle`). Replace them with the real organic blob SVG paths (`ORGANIC_A` / `ORGANIC_B`) that already exist in `BrandBlobs.tsx` but aren't used anywhere. Keep the official CALP palette — no new colours.

## Changes

### 1. `src/components/site/BrandBlobs.tsx`
- The blob components (`RedBlob`, `TealBlob`, `PaleTealBlob`, `PaleRedBlob`, `BlueBlob`) already render `ORGANIC_A`/`ORGANIC_B` SVG paths — keep them as-is.
- Add an `opacity` prop (or accept opacity via the existing `className`, which already works through Tailwind `opacity-*`). No structural change needed.
- The flat circle components stay exported for any future use but are removed from the two usage sites below.

### 2. `src/routes/index.tsx` — hero section (lines ~80–82)
Swap the three circles for organic blobs behind the hero image, keeping the same corner positions and brand colours:
- `TealCircle` → `TealBlob` (top-left, opacity-90)
- `PaleTealCircle` → `PaleTealBlob` (top-right)
- `RedCircle` → `RedBlob` (bottom-right)

Adjust `className` sizing so each blob sits behind the image corner at roughly the same visual footprint as the circles did (blobs are larger organic shapes, so reduce `w/h` slightly to avoid overflow). Keep `overflow-hidden` on the parent so blobs clip cleanly.

### 3. `src/components/site/HowToApply.tsx` — band (lines ~27–30)
Swap the four circles for organic blobs:
- `PaleTealCircle` (left) → `PaleTealBlob`
- `PaleTealCircle` (right-bottom) → `PaleTealBlob`
- `RedCircle` (right-bottom) → `RedBlob`
- `TealCircle` (top) → `TealBlob` (opacity-40)

Keep the same positions/opacities; tune sizes so the blobs fill the band corners without overlapping the step content.

## Notes
- Brand palette is untouched (`src/styles.css` lines 50–63).
- No new dependencies; pure SVG, already in the bundle.
- Both usage sites keep `overflow-hidden` + `relative` parents so the blobs clip at the section edge.
- Responsive behaviour is unchanged — blobs are decorative `pointer-events-none` absolute elements.
