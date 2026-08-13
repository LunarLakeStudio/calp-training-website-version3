# Training Hub button in Pale Teal

## What changes

The "Training Hub" button changes from Dark Blue to Pale Teal `#9cd1da` (existing brand tint). Text switches to Dark Blue `#065b82` so it stays legible and passes contrast on the light teal fill. The lock icon inherits the same Dark Blue.

Applies everywhere the button appears:
- Header (desktop, far right of the navigation)
- Mobile menu (top item)

The footer "Training Hub Login" text link stays a Dark Blue text link — it is a link, not a button, so it keeps the secondary-link styling.

## Details

- `src/components/site/TrainingHubButton.tsx`: button variant background becomes the pale teal token, label/icon colour becomes `text-calp-blue`.
- `src/components/site/SiteHeader.tsx`: drop the white border that was added for contrast against the dark blue bar — the pale teal fill already separates the button from the background.
- No new colours introduced; `#9cd1da` is the official Pale Teal from the brand palette. If it is not yet a CSS token in `src/styles.css`, it will be added as `--calp-pale-teal` and used by name rather than hardcoded.
