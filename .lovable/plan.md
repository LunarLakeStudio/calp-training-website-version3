# More CALP shapes on the How to apply page

The page already uses the brand shape clusters behind the hero image and in the peach CTA band. To match the homepage feel, add the same clusters (same shapes, same brand colours) in the places the page currently has none.

## Changes

1. **Hero, left side** — add the homepage's full-bleed cool cluster behind the text column (`ShapeClusterCool`, off the left edge, low opacity), exactly as on the homepage hero. Text stays fully readable above it.
2. **Three-steps section** — add a soft warm cluster off the right edge behind the step cards and a small cool cluster low-left, both behind content (`-z-10`) so cards stay clean white.
3. **Information panel** — add one subtle cool cluster clipped inside the pale blue panel's right edge, so the panel echoes the homepage bands.
4. Keep the existing hero-image and CTA clusters unchanged.

## Notes

- Only `src/routes/how-to-apply.tsx` changes; no new components, colours or fonts. Shapes come from `ShapeClusterCool` / `ShapeClusterWarm`, which already use only official CALP tints.
- Shapes stay decorative: `aria-hidden`, `pointer-events-none`, behind text, opacity tuned so body text keeps its contrast.
- Verified on desktop and mobile widths so no shape causes horizontal overflow.
