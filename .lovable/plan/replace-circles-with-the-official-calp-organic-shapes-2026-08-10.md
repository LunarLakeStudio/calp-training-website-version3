# Replace circles with the official CALP organic shapes

The uploaded SVGs are the real brand device: soft, asymmetric organic forms that overlap each other with transparency, exactly as in `CALP_Bottom_shapes.png`. Circles go away entirely.

## What's usable from the uploads

| File | Content | Usable? |
| --- | --- | --- |
| `3.svg` | Single clean path, teal `#00abbf` at 40% | Yes — soft wide oval |
| `15.svg` | Single clean path, red `#c91619` at 69% | Yes — the distinctive notched "wave" form |
| `2.svg` | Single clean path, yellow `#f9b916` at 60% | Yes as geometry, but the colour is off-brand |
| `1.svg`, `17.svg`, `21.svg` | Base64 PNG inside an SVG mask, not real paths | No — raster, can't be recoloured as vectors |

So three genuine vector silhouettes are available. Their `d` attributes are extracted and inlined as reusable path constants; the yellow one is recoloured to a brand value (its shape is fine, only the fill was off-brand). No raster files are embedded.

## Palette compliance

Every fill is one of the nine values from the design guide — nothing else is permitted anywhere in the shape system:

| Guide name | Hex |
| --- | --- |
| Dark Blue (main) | `#065b82` |
| CALP Red (secondary) | `#ca2128` |
| Teal (secondary) | `#00b0bf` |
| Dark blue 75% | `#4484a1` |
| Dark blue 50% (accent) | `#82adc0` |
| CALP red 20% (accent) | `#f0cdbf` |
| Teal 50% (accent) | `#9cd1da` |
| Black | `#000000` |
| White | `#ffffff` |

Two colours in the uploaded SVGs are **not** brand values and are corrected: `#00abbf` becomes teal `#00b0bf`, `#c91619` becomes CALP Red `#ca2128`, and the yellow `#f9b916` is dropped entirely in favour of a brand fill. Fills reference the existing CSS variables (`var(--calp-red)` etc.) rather than literal hexes, so the palette stays single-sourced in `src/styles.css` and can never drift.

The guide's colour hierarchy is respected: Dark Blue is the main interface colour, red and teal are secondary, and the three tints are accents only. Dark Blue is never placed directly against CALP Red — where the two clusters meet, a white or pale-tint gap separates them, as the guide requires.

## Transparency

Transparency is applied with `fill-opacity`, which is what produces the overlap blending in the reference image:

- Teal `#00b0bf` at 0.4–0.5
- Dark blue `#065b82` at 0.5–0.65
- CALP red `#ca2128` at 0.65–0.7
- Pale teal `#9cd1da` and pale red `#f0cdbf` at full opacity for the largest, quietest background forms

Using true `fill-opacity` (rather than the pre-mixed tint hexes) is what lets two shapes overlap and darken at the intersection, the signature look of the brand shapes. Red is present in every cluster, per the guide.

A separate site-wide sweep removes arbitrary Tailwind `opacity-*` and `/20`-style alpha modifiers layered on brand colours elsewhere in the app, since those generate shades that appear nowhere in the guide; each is replaced with the correct named tint.


## New component: `src/components/site/BrandShapes.tsx`

Replaces `BrandBlobs.tsx` entirely.

- Three path constants extracted from the uploaded SVGs (`SHAPE_OVAL`, `SHAPE_WAVE`, `SHAPE_ROUND`), each with its own `viewBox` preserved so the geometry isn't distorted.
- A `<BrandShape shape fill opacity className />` primitive rendering one path, absolutely positioned, `pointer-events-none`, `aria-hidden`.
- Two composed clusters mirroring the reference image:
  - `ShapeClusterCool` — large pale-teal oval with a dark-blue form overlapping its lower-left, so the intersection reads darker.
  - `ShapeClusterWarm` — red wave crossing a dark-blue oval, with a small pale-red form catching the top edge.
- Each shape gets a slight individual rotation/scale via transform so no two clusters look stamped from the same template, and generous blur-free crispness is kept (no filters — these stay razor sharp at any zoom).
- `overflow-hidden` on the host section clips them; sizes are set in `rem`-based Tailwind classes so they scale with the layout rather than overflowing on mobile.

`BrandBlobs.tsx` is deleted along with its unused blob and circle exports.

## Usage sites

### `src/routes/index.tsx` — hero
The three circles behind the hero image are replaced with one `ShapeClusterCool` behind the image's top-left and a smaller warm accent at the bottom-right, so the photo sits inside the shapes rather than on top of stray dots. All `opacity-*` utility classes are dropped — opacity now lives in the SVG fills.

### `src/components/site/HowToApply.tsx` — pale red band
The four circles are replaced with a `ShapeClusterWarm` bleeding off the right edge and a cool cluster off the left, tuned so they read correctly against the `#f0cdbf` band instead of washing out. Content keeps its `relative z-10` so no shape ever crosses the numbered steps or the button.

## Notes
- Pure inline SVG — no new dependencies, no image requests, and the shapes stay sharp on any display.
- No new colours and no new fonts; every fill is a palette value at a stated opacity.
- Text contrast is unaffected: shapes sit behind content and never under body copy at an opacity that would reduce legibility.
