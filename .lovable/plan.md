# Add a "Visit the CALP Network website" button to the hero

## What changes

In the hero section on the left (text) side, add a third button beneath the headline, next to the existing "Explore courses" and "Find a training" buttons.

- Label: "Visit the CALP Network website"
- Destination: the same external link used in the footer — https://www.calpnetwork.org — opening in a new tab.
- Styling: secondary/outlined treatment in Dark Blue (outline + Dark Blue label, filling Dark Blue with white text on hover) so it reads as clearly secondary to the red "Explore courses" primary CTA and does not compete with the red outlined "Find a training" button.
- Same size, padding, and rounded corners as the two existing hero buttons; the button group already wraps, so on narrow screens it drops onto its own line.

Nothing else in the hero, navigation, or footer changes.

## Technical notes

- `src/routes/index.tsx` — add an `<a href="https://www.calpnetwork.org" target="_blank" rel="noreferrer">` styled as a button inside the existing `flex flex-wrap gap-4` group.
- Uses existing `calp-blue` tokens only; no new colours or fonts.
