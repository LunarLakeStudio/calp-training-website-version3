# Training Hub button in white

## What changes

The "Training Hub" button changes from the pale blue-grey `#c0cfdf` to white, with Dark Blue `#065b82` text and lock icon — matching the "Find a training" button next to it in the header, so the two read as a matched pair on the dark blue bar.

- Header (desktop, far right of the navigation): white fill, Dark Blue label
- Mobile menu (top item): same white fill; since the dropdown panel is already white, a thin Dark Blue border keeps the button visible there

The footer "Training Hub Login" text link is unchanged.

## Technical detail

- `src/components/site/TrainingHubButton.tsx`: button variant background becomes `bg-white`, text stays `text-calp-blue`, plus a light `border border-calp-blue/20` so the button still has an edge against white surfaces.
- The now-unused `--calp-pale-blue` token added earlier is removed from `src/styles.css` to keep the palette clean.
