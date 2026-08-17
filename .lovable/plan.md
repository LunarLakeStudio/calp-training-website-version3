# Hero buttons: exact CALP Red, with the CALP Network link in the middle

## What changes

The hero button group on the homepage keeps three buttons but reorders them so the external link sits between the two internal CTAs:

1. **Explore courses** — solid CALP Red `#CA2128`, white text, hover slightly darkens (opacity 90%)
2. **Visit the CALP Network website** — solid CALP Red `#CA2128`, white text, same hover (moved to the middle)
3. **Find a training** — CALP Red outline with CALP Red label, fills solid CALP Red with white text on hover

All three share identical padding, font weight, radius and height so the row reads as one balanced group. Every red value comes from the existing `calp-red` token (`#ca2128`) — background, text, border and hover states — with no hardcoded hex or off-brand tints.

Mobile/desktop consistency: the group keeps wrapping on narrow screens, and each button stretches to the same full-width block on very small screens so the three stack evenly instead of ragged widths.

Nothing else in the hero, navigation or footer changes.

## Technical notes

- `src/routes/index.tsx` — reorder the three elements inside the existing `flex flex-wrap gap-4` group and normalise their classes to one shared base (`rounded-md px-7 py-3 font-medium`), with `bg-calp-red text-white hover:opacity-90` for the two solid buttons and `border border-calp-red text-calp-red hover:bg-calp-red hover:text-white` for the outlined one.
- Add `w-full sm:w-auto text-center` to each button for even stacking on small screens.
- No changes to `src/styles.css`; the `calp-red` token already holds `#ca2128`.
