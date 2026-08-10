# Align the site with the CALP design implementation guide

The guide confirms the official decorative device is a **cluster of flat circles** — one large circle with smaller satellites, in the brand palette — not organic blobs. It also reveals that the "%" colours are **transparency levels of the base colours**, and it sets a clear colour hierarchy per surface. This plan drops the earlier "organic blobs" direction and implements the guide as written.

## What the guide changes

**1. Decorative shapes are circle clusters.** Keep circles, but arrange them as the brand does: one dominant circle with 3–5 smaller circles of varying size overlapping its edge, in mixed brand tints. Each cluster keeps CALP red present (the guide requires red in every design), usually as a small accent circle.

**2. Transparency is the palette, not an effect.** The tints in the guide are exact colours representing opacity of the base:

| Guide name | Hex | Equivalent |
| --- | --- | --- |
| Dark blue 75% | `#4484a1` | `#065b82` at 75% on white |
| Dark blue 50% | `#82adc0` | `#065b82` at 50% on white |
| Teal 50% | `#9cd1da` | `#00b0bf` at 50% on white |
| CALP red 20% | `#f0cdbf` | `#ca2128` at 20% on white |

So the shapes must use these **exact tints at full opacity**. The current code layers arbitrary `opacity-40` / `opacity-70` / `opacity-90` on top of full-strength colours, which produces off-brand shades that appear nowhere in the guide. Those arbitrary opacity classes are removed. Where a shape genuinely sits over a coloured band (the "How to apply" pale-red band), the tint is chosen so it reads correctly on that background rather than faked with opacity.

**3. Colour hierarchy per surface.** The guide assigns roles by surface:

- **External interface (site pages):** Dark Blue `#065b82` is *main*; CALP Red and Teal are *secondary*; Dark blue 50%, red 20% and teal 50% are *accents*.
- **Forms (apply / contact):** red 20% `#f0cdbf` for backgrounds only; text and buttons in CALP Red or Dark Blue.
- **Never** place Dark Blue directly on CALP Red or vice versa (jarring combination the guide calls out by name).

Applied consistently, this means Dark Blue carries the interface (nav, links, secondary buttons, card headings), red stays the action/emphasis colour (H1, primary buttons), and the pale tints are reserved for backgrounds and decorative circles.

## Changes by file

### `src/styles.css`
- Keep the nine palette tokens (already correct hexes).
- Add semantic aliases documenting the guide's roles so components read intent, not raw colour: a main/secondary/accent mapping for the external interface, and a form-background token pointing at red 20%.
- Verify the shadcn mappings follow the hierarchy — `--secondary` currently points at red 20% (correct as a background), `--ring`/`--accent-foreground` at Dark Blue (correct).

### `src/components/site/BrandBlobs.tsx`
- Remove the unused `ORGANIC_A` / `ORGANIC_B` blob components (`RedBlob`, `TealBlob`, `PaleTealBlob`, `PaleRedBlob`, `BlueBlob`) — they aren't the brand device.
- Keep the circle primitives and add the missing tints: dark blue, dark blue 75%, dark blue 50%, teal, teal 50%, red, red 20%.
- Add a `CircleCluster` component that renders a brand-accurate grouping (one dominant circle + satellites) with variants for a light background and for the pale-red band, so both usage sites get a consistent, guide-compliant cluster instead of hand-placed one-offs.

### `src/routes/index.tsx` — hero
- Replace the three hand-placed circles with a `CircleCluster` behind the hero image: dominant Dark Blue circle, satellites in teal 50%, dark blue 50%, red 20%, and a small CALP Red accent.
- Remove `opacity-90` and friends; the tints carry the lightness.

### `src/components/site/HowToApply.tsx` — pale red band
- Replace the four circles with a cluster tuned for the `#f0cdbf` background: dominant Dark Blue 75% circle with teal 50%, dark blue 50% and a small red accent — matching the second palette illustration in the guide, which is exactly this arrangement.
- Remove `opacity-40` / `opacity-70` / `opacity-90`.

### Forms — `src/routes/apply.tsx`, `src/routes/contact.tsx`
- Any decorative or panel background moves to red 20% `#f0cdbf`; field labels and helper text in black, buttons and links in CALP Red or Dark Blue per the guide's forms rule.
- Audit for any Dark-Blue-on-red or red-on-Dark-Blue pairing and separate them with white or a pale tint.

### Site-wide audit
- Sweep all routes and site components for arbitrary opacity on brand colours (`/20`, `/40`, `opacity-*` on `bg-calp-*`) and replace with the correct named tint.
- Confirm image corners stay rounded and Roboto remains the only font (both already in place).

## Notes
- No new colours and no new fonts are introduced — every value comes from the guide's table.
- H1 stays CALP Red per your earlier brand rule; Dark Blue takes the "main" interface role the guide describes, so red reads as emphasis rather than as the base colour.
- Contrast is checked for each pairing: black and Dark Blue on white and on red 20% pass AA; white on CALP Red and on Dark Blue pass AA. Pale tints are never used for text.
