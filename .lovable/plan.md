# Buttons back to CALP Red with white text

## What changes

Every action button across the site becomes CALP Red `#CA2128` with white text. Headings and body text stay Dark Blue — this change is buttons only.

Buttons that switch to red + white:
- Home page: "Explore courses" primary CTA; the outlined secondary CTA becomes a red outline with red label that fills red with white text on hover
- "How to apply" section CTA
- Training cards and training rows: "Apply for this Training" / apply buttons
- Course and training detail pages: apply / submit buttons
- Apply form: submit button
- Contact page: send button
- Trainers page: "Load More Trainers" button, and the outlined reset/secondary control gets a red outline
- Error and not-found screens in the root layout: primary buttons red, secondary stays outlined

Left unchanged on purpose:
- Header bar stays Dark Blue; the "Find a training" button stays white-on-blue and "Home" stays pale red, since red on the dark blue bar would be low contrast
- "Training Hub" button stays `#c0cfdf`
- Small badges/pills, step number circles, progress dots, form field borders and focus rings, filter chips, dividers — these are not buttons
- Decorative shapes and pale tint backgrounds

## Technical detail

- Only presentation classes change: `bg-calp-blue` → `bg-calp-red` (with `text-white`) on button/link-as-button elements in `src/routes/index.tsx`, `apply.tsx`, `contact.tsx`, `trainers.tsx`, `courses.$courseId.tsx`, `trainings.$trainingId.tsx`, `__root.tsx`, and `src/components/site/HowToApply.tsx`, `TrainingCard.tsx`, `TrainingRow.tsx`.
- Outlined secondary buttons move `border-calp-blue`/`text-calp-blue` to the red equivalents, keeping their hover fill behaviour.
- Hover states keep `hover:opacity-90`; no new colour tokens needed since `--calp-red: #ca2128` already exists.
- Contrast: white on `#ca2128` passes AA for button text.
