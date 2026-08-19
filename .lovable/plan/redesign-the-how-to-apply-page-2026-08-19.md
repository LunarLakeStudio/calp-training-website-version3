# Redesign the "How to apply" page

Rebuild `/how-to-apply` as a split-screen hero plus structured content, matching the Homepage's visual language. Navigation, footer, palette and Roboto typography stay unchanged.

## 1. Split-screen hero (below the nav)

- **Left:** the existing pale-red "Applications" chip, heading "How to apply for a CALP Network training", supporting line "Find the right training, complete your application and receive a decision from the CALP Network training team.", then two CTAs — "Find a Training" (solid CALP Red, white text) and "Browse courses" (outlined). Same button styling as the Homepage hero.
- **Right:** the newly supplied application photograph in a large landscape frame — `aspect-[4/3]`, `rounded-2xl`, `object-cover` with the focal point set so the applicant, laptop and form stay in view.
- Two CALP organic shape clusters sit behind the image only (offset to the outer edges, `-z-10`), exactly as on the Homepage. No shape crosses the face or laptop, no text over the photo.
- On mobile the text block stacks above the image.

## 2. "Your application in three simple steps"

Three equal-height cards in one row (stacked on mobile), joined by a thin connector line on desktop. Each card: a prominent numbered circle, a solid CALP Red icon box with a white Lucide icon (search / form / mail), a Dark Blue heading, and the concise copy from the request. Very subtle hairline border, soft shadow, generous padding.

## 3. Two-column information panel

One rounded panel on a pale CALP blue background with a small information icon:

- **Left — "Before you apply":** four-item checklist (review details and eligibility; check dates, format, location, language; use an email you check regularly; submit before the deadline).
- **Right — "Good to know":** the existing caveat about places not being guaranteed and checking spam/junk.

## 4. "Ready to apply?" band

Keep the peach (`#f7e4db`) band with its shapes, but tighten the padding for a cleaner, slightly more compact look. Buttons unchanged: red "Find a Training", outlined "Browse courses".

## Technical notes

- Upload the photograph as a CDN asset (`src/assets/how-to-apply-hero.jpg.asset.json`) and import the pointer.
- Add a `--calp-pale-blue-soft` token in `src/styles.css` for the information panel (a light tint of Dark Blue) and register it in `@theme inline` so `bg-calp-pale-blue-soft` exists. No other new colours.
- Step copy moves into `src/data/apply-steps.ts` (already the single source shared with the Homepage band) so wording is refreshed in both places; the "Before you apply" checklist is added there too.
- Only `src/routes/how-to-apply.tsx`, `src/data/apply-steps.ts`, `src/styles.css` and the new asset pointer change.
- Verify at desktop and mobile widths: no horizontal scroll, equal card heights, shapes clear of the subject.
