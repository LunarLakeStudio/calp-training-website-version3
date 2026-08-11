# Add a "Training Hub" button to the site navigation

## What changes

1. **Label capitalisation** — the "Training hub" divider label next to the logo becomes the button label "Training Hub" (both words capitalised).
2. **Header button** — a clearly visible "Training Hub" button on the far right of the main navigation, with a small lock icon, linking out to the separate invite-only Training Hub app (Admins/Trainers only).
3. **Central config** — the destination lives in one place: `src/config/site.ts`, exporting `TRAINING_HUB_LOGIN_URL`. It stays an empty placeholder until you supply the real URL — no invented URL is shipped. While empty, the button renders disabled-looking (not clickable) with a tooltip/`title` of "Coming soon", so nothing links to a dead address.
4. **Mobile** — the header currently has no mobile menu at all (nav links are hidden below the large breakpoint). A compact menu button opens a dropdown containing the existing nav links plus the "Training Hub" button at the top, styled prominently.
5. **Footer** — a secondary "Training Hub Login" text link in Dark Blue, alongside the existing policy links.

## Placement in the header

```text
[CALP logo]   Home Courses Trainings Trainers Calendar How to apply   [Globe EN v] [Find a training] [🔒 Training Hub]
```

The existing "Find a training" red primary button is unchanged. "Training Hub" sits to its far right as a Dark Blue button (secondary role per the brand rules: red for the primary public action, Dark Blue for secondary/utility), white label, same radius, padding, Roboto Medium and hover treatment as the existing button — so the two read as a matched pair. The old "Training hub" text label and its divider next to the logo are removed, since the same words now live in the button.

## Branding

- Colours from the official palette only: Dark Blue `#065B82` background, white text; no new colours.
- Roboto Medium, sentence-case-consistent title casing as specified ("Training Hub").
- Lock icon from the existing lucide icon set at the same size as the header's globe icon.
- Contrast: white on Dark Blue passes AA.
- Opens in a new tab (`target="_blank"`, `rel="noreferrer"`) since it is a separate application.

## Technical notes

- New file `src/config/site.ts`: `export const TRAINING_HUB_LOGIN_URL = "";` with a comment explaining it is the single place to set the external URL.
- `src/components/site/TrainingHubButton.tsx`: shared component with a `variant` prop (`"button"` for header/mobile, `"link"` for the footer) reading the config value and handling the empty-URL case.
- `src/components/site/SiteHeader.tsx`: render the button in the existing right-hand cluster; add the mobile menu (shadcn dropdown-menu, already imported in this file) exposing the same nav links plus the button. No other header/nav changes.
- `src/components/site/BrandWordmark.tsx`: drop the "Training hub" label and divider.
- `src/components/site/SiteFooter.tsx`: add the "Training Hub Login" link.
- Nav link labels stay driven by `src/i18n/dict.ts`; "Training Hub" is a product name and stays untranslated.
