# Navigation bar: white logo on dark blue

## What changes

1. **Logo (top left)** — use the newly supplied white CALP logo (2-line, white with subtitle) in the site header, unmodified. The red logo stays in place everywhere else (footer, sub-pages) unless it sits on a dark blue background.
2. **Navigation panel background** — Dark Blue `#065b82` (existing `calp-blue` token) instead of white.
3. **Navigation text** — white for all nav links, the language selector and the mobile menu trigger, with white/pale hover and focus states so contrast stays accessible on the dark bar.
4. **Home button** — rendered as a distinct button in Pale Red `#f7e4db` (existing `calp-pale-red-soft` token) with Dark Blue text, so it reads as a button rather than a plain link.

The existing "Find a training" red button and the "Training Hub" button stay, with borders/outlines adjusted for legibility against dark blue.

## Technical notes

- Upload the attached white logo as a CDN asset pointer (`src/assets/calp-logo-white.png.asset.json`) and reference it from `src/components/site/BrandWordmark.tsx` via a `variant` so header uses white and footer keeps its current logo.
- `src/components/site/SiteHeader.tsx`: swap `bg-white` for `bg-calp-blue`, change link colour classes from `text-calp-blue` to `text-white`, give the Home item pale-red button styling, and adjust the mobile menu trigger border and focus rings.
- No new colours or fonts; only existing brand tokens are used.
