# Apply the official CALP brand system across the app

Keep the approved layout from the attached design. Replace the current palette and typography with the official CALP brand system, applied consistently to every page.

## Brand tokens

Defined once in `src/styles.css` and used everywhere via semantic classes — no new colours, no other fonts.

| Token | Value | Use |
| --- | --- | --- |
| CALP Red | `#CA2128` | H1, H2/H3, primary buttons, key links |
| Dark Blue | `#065B82` | H2/H3 alternative, secondary buttons and links, nav |
| Teal | `#00B0BF` | Decorative only |
| Dark Blue 75% | `#4484A1` | Decorative / muted UI |
| Dark Blue 50% | `#82ADC0` | Decorative / muted UI |
| Pale Red | `#F0CDBF` | Decorative bands (e.g. "How to apply") |
| Pale Teal | `#9CD1DA` | Decorative shapes |
| Black | `#000000` | Body text |
| White | `#FFFFFF` | Page background, text on red |

Typography: Roboto only, weights 400 / 500 / 700, loaded once in the root route. The Sora + Inter pairing is removed and `--font-display` / `--font-sans` both map to Roboto.

## Rules enforced in components

- H1 Roboto Bold in CALP Red; H2/H3 in Red or Dark Blue; body copy black.
- Primary buttons: red background, white text. Secondary buttons and links: Dark Blue.
- Teal and pale tints reserved for decorative shapes and bands — never for text or primary UI.
- Sentence case everywhere; the existing ALL-CAPS eyebrows, badges and wordmark labels are converted.
- Text left-aligned; generous white space; white page background (the off-white canvas is dropped).
- Rounded corners on images and cards, CALP organic blob shapes kept and recoloured to teal / pale teal / pale red / red.
- Contrast checked: black on white and white on red pass AA; Dark Blue links on white pass AA.

## Logo

The supplied official 2-line red logo with subtitle is used as-is — uploaded via the asset pipeline and rendered at a fixed height with `w-auto`, never recoloured, cropped or stretched. The hand-built text wordmark next to it in `BrandWordmark` is removed so the official lockup stands alone (with the "Training Hub" divider label retained in sentence case). Header and footer use the same file. Favicon derived from the same logo, padded to a square so proportions are preserved.

## Homepage layout (from the approved design)

1. **Hero** — left: "Build the skills to deliver better CVA." in red Roboto Bold, black sub-line, red "Explore courses" primary button + Dark Blue outlined "Find a training". Right: the supplied hero photo with rounded corners and teal / pale-teal / red organic shapes behind its corners.
2. **Three-column band** — *Explore our courses* (three rounded photo cards), *Upcoming trainings* (red day / month, title, meta, red Apply buttons, hairline dividers), *Meet our trainers* (portrait cards with name, languages, region), each with a Dark Blue "View all →" link.
3. **How to apply** — full-width Pale Red band with organic shapes, red heading, three numbered steps in red circles, Dark Blue "See application guidance" button.
4. **Footer** — official logo left, centred Dark Blue "Visit the CALP Network website" link, red policy links right.

All content stays wired to the live database; only presentation changes.

## Every other page

Courses, course detail, trainings, training detail, trainers, calendar, apply and contact are restyled with the same tokens, Roboto, header/footer and card components — structure and functionality unchanged — so this site and the Training Hub read as one CALP product family.

## Technical notes

- `src/styles.css`: brand tokens in `:root`, exposed through `@theme inline` as `calp-red`, `calp-blue`, `calp-teal`, `calp-blue-75`, `calp-blue-50`, `calp-pale-red`, `calp-pale-teal`. Old `calp-navy` / `calp-slate` / `calp-canvas` tokens are replaced and all usages updated (they appear across every route and component).
- Roboto via Google Fonts `<link>` in `src/routes/__root.tsx` (weights 400,500,700), replacing the Sora/Inter link.
- Components touched: `BrandWordmark`, `SiteHeader`, `SiteFooter`, `PageHero`, `CourseCard`, `TrainingRow`, `TrainerCard`, `FilterChip`, `BrandBlobs`, plus a new `HowToApply` section and the rewritten `src/routes/index.tsx`.
- Logo and hero uploaded as `lovable-assets` pointers; favicon written as a real square PNG in `public/`.
- Responsive: the three-column band collapses to one column with grid + `min-w-0` so text truncates rather than clips.
