# Training Hub button in pale blue-grey

## What changes

The "Training Hub" button changes from Pale Teal `#9cd1da` to `#c0cfdf`. The label and lock icon stay Dark Blue `#065b82`, which keeps good contrast on the lighter fill.

Applies where the button appears:
- Header (desktop, far right of the navigation)
- Mobile menu (top item)

The footer "Training Hub Login" text link is unchanged — it stays a Dark Blue text link.

## Note

`#c0cfdf` is not one of the official CALP palette colours currently in the project (Pale Red `#f0cdbf`, Pale Red soft `#f7e4db`, Pale Teal `#9cd1da`, Dark Blue tints `#4484a1` / `#82adc0`). It reads as a soft blue-grey and sits comfortably beside the Dark Blue bar, so it works visually, but flagging it since the brand rules say not to introduce new colours. Happy to swap it for a palette colour instead if you prefer.

## Technical detail

- Add `--calp-pale-blue: #c0cfdf` to the token block in `src/styles.css` and expose it as `--color-calp-pale-blue` so it can be used as `bg-calp-pale-blue`.
- `src/components/site/TrainingHubButton.tsx`: button variant background becomes the new token; text stays `text-calp-blue`. No hardcoded hex in components.
