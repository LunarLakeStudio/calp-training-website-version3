# Add homepage brand shapes to the How to apply page

Bring the same decorative organic shapes used on the homepage onto `/how-to-apply`, so the page feels visual and on-brand — without changing content, layout or colours.

## What changes

1. **Hero area** — wrap the page hero in a relative, overflow-hidden band and place a cool (teal / dark blue tints) shape cluster bleeding off the left edge, plus a warm (red / pale red tints) cluster bleeding off the right, behind the text. Same components and opacities as the homepage hero, so nothing overlaps or dims the headline.
2. **"Ready to apply?" CTA card** — add one warm cluster bleeding off the bottom-left of that section, mirroring how the homepage "How to apply" band is framed.
3. Shapes stay purely decorative: behind content (`-z-10`), `pointer-events-none`, no new colours, no text or button changes, and steps/note cards keep their current white/muted surfaces.
4. No pale red background bands are introduced (per the earlier decision to keep this page clean).

## Technical notes

- Reuse `ShapeClusterCool` / `ShapeClusterWarm` from `src/components/site/BrandShapes.tsx` — the same exports the homepage uses, so shapes and tints match exactly.
- Only `src/routes/how-to-apply.tsx` is edited: add a wrapping `<section className="relative overflow-hidden">` around `AnimatedPageHero`, and `relative overflow-hidden` on the CTA wrapper, with clusters positioned via the same offset/size utility pattern used in `src/routes/index.tsx`.
- Verify at desktop and mobile widths that no shape causes horizontal scroll and text contrast is unaffected.
