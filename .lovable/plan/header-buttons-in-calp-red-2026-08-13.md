# Header buttons in CALP Red

Make the two header call-to-action buttons CALP Red (#CA2128) with white text.

## Changes

- **Find a training** (header, desktop): currently a white button with dark blue text on the dark blue nav bar. Becomes CALP Red background with white text, same size and rounded corners.
- **Training Hub** (header button, desktop + mobile menu): currently dark blue background with a white outline. Becomes CALP Red background with white text; the white outline is dropped since red already contrasts with the dark blue bar.
- Hover stays the existing subtle opacity fade; the lock icon and label stay unchanged.
- The footer "Training Hub Login" text link stays a Dark Blue link (text link, not a button).

## Technical notes

- `src/components/site/SiteHeader.tsx`: swap `bg-white ... text-calp-blue` on the Find a training link for `bg-calp-red text-white`, and remove the `border border-white/70` on the Training Hub button.
- `src/components/site/TrainingHubButton.tsx`: button variant base changes from `bg-calp-blue text-white` to `bg-calp-red text-white`; link variant unchanged.
- Uses the existing `calp-red` token (#ca2128) in `src/styles.css`; no new colours.
