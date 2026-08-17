# Add a "Visit the CALP Network website" button to the hero

## What changes

In the hero section on the left (text) side, add a third button beneath the headline, next to the existing "Explore courses" and "Find a training" buttons.

- Label: "Visit the CALP Network website"
- Destination: the same external link used in the footer — https://www.calpnetwork.org — opening in a new tab.
- Styling: CALP Red `#CA2128` background with white text, matching the "Explore courses" primary CTA (same red, white label, hover opacity).
- Same size, padding, and rounded corners as the two existing hero buttons; the button group already wraps, so on narrow screens it drops onto its own line.

Nothing else in the hero, navigation, or footer changes.

## Technical notes

- `src/routes/index.tsx` — add an `<a href="https://www.calpnetwork.org" target="_blank" rel="noreferrer">` inside the existing `flex flex-wrap gap-4` group, using `bg-calp-red text-white` with the same padding/radius as the other hero buttons.
- Uses the existing `calp-red` token only; no new colours or fonts.
