# Simplify and rebalance the desktop header

## What changes (desktop header)

- Remove the white "Find a training" button from the header. The hero "Find a training" CTA stays exactly as it is.
- Remove the "Training Hub" button from the desktop header.
- Replace the discreet "CALP Network ↗" text link with a prominent filled button labelled **Visit CALP Network ↗**:
  - Solid CALP Red (`bg-calp-red`, the same token as the Apply / Explore courses CTAs), white medium-weight label, white external-link icon.
  - Generous horizontal padding, `whitespace-nowrap` so the full label always sits on one line.
  - Opens the CALP Network site in a new tab, with an accessible label noting it opens externally.
- Right-hand cluster order becomes: language selector (globe + EN + chevron) → red "Visit CALP Network ↗" button, with consistent gap between them.
- Main nav order unchanged: Home, Courses, Trainings, Trainers, Calendar, How to apply.
- Header stays compact; logo, nav links and controls remain vertically centred in one row.

## Mobile / tablet

The hamburger menu becomes:

1. **Visit CALP Network ↗** as the primary red action at the top of the menu.
2. Nav links: Home, Courses, Trainings, Trainers, Calendar, How to apply.
3. Secondary: **Training Hub Login** with its lock icon.

The language selector stays visible outside the menu on small screens (globe + EN), so it remains reachable without opening the menu.

## Footer

Unchanged, except confirming the "Training Hub Login" link with its lock icon remains clearly accessible where it is today.

## Technical notes

- `src/components/site/SiteHeader.tsx`: delete the "Find a training" `Link` and the desktop `TrainingHubButton`; convert the external anchor into a red button using the existing `calp-red` token plus a lucide `ArrowUpRight`/`ExternalLink` icon; reorder the cluster so the language dropdown precedes the button; add the red CALP Network item and the `TrainingHubButton variant="link"` entry to the mobile `DropdownMenuContent`.
- No new colour tokens, fonts, or routes. `src/config/site.ts` keeps `CALP_NETWORK_URL` as the single source for the destination.
- `TrainingHubButton.tsx` is reused as-is (its `variant="link"` mode already renders the lock icon).
