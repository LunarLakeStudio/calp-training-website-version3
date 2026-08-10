# Drop the red "tail" shape from the brand shape system

The red form with the pointed tail comes from `15.svg` (the notched "wave" silhouette). It reads as a spike rather than a soft organic blob, and it is the one shape in the set that does not match the brand artwork. It gets removed everywhere.

## What stays

Only the two clean, soft silhouettes remain:

| Constant | Source | Form |
| --- | --- | --- |
| `SHAPE_OVAL` | `3.svg` | wide soft oval |
| `SHAPE_ROUND` | `2.svg` | rounder, slightly squarer blob |

The other three uploads (`1.svg`, `17.svg`, `21.svg`) are base64 PNGs inside SVG masks, not real paths, so they cannot be used as recolourable vectors. Nothing new is introduced.

## Changes

`src/components/site/BrandShapes.tsx`
- Delete the `SHAPE_WAVE` path constant and its `wave` entry in the `SHAPES` map, so the tailed shape can no longer be referenced anywhere.
- `ShapeClusterCool`: the red accent switches from `wave` to `round`, kept small and rotated so it still reads as a distinct third form overlapping the teal oval.
- `ShapeClusterWarm`: the large red form switches from `wave` to `oval`, rotated and offset so it crosses the pale-blue round form the same way — the overlap darkening is preserved.
- Rotations and sizes are re-tuned per instance so the two clusters do not look like the same two shapes stamped twice.

## Unchanged

- Palette: every fill still references `var(--calp-*)`; CALP Red stays present in both clusters, per the guide.
- Transparency: same `fill-opacity` ranges, so the overlap blending look is identical.
- Placement: hero framing (`src/routes/index.tsx`) and the bottom "How to apply" band (`src/components/site/HowToApply.tsx`) keep their current positions, sizes and z-order — shapes stay decorative, behind content, `aria-hidden`.
- No other file changes; no layout, data or logic touched.
