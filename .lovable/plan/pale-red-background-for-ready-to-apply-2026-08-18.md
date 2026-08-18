# Pale red background for "Ready to apply?"

Give the "Ready to apply?" block on the How to apply page the same pale soft red band background used behind the "How to apply" shapes on the Homepage.

## Change

- In `src/routes/how-to-apply.tsx`, wrap the "Ready to apply?" area in a full-width section with `bg-calp-pale-red-soft` (#f7e4db), `relative overflow-hidden` and vertical padding, matching the Homepage band in `src/components/site/HowToApply.tsx`.
- Keep the existing decorative `ShapeClusterCool` / `ShapeClusterWarm` inside that band so the shapes sit on the pale red, as on the Homepage.
- Keep the white card, heading, text and the "Find a Training" (CALP Red) and "Browse courses" (Dark Blue outline) buttons unchanged.

No new colours or tokens; nothing else on the page changes.
