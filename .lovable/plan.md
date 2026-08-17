# CALP Network link moves from the hero to the header

## What changes

**Hero (homepage)**
- Remove the red "Visit the CALP Network website" button.
- Two CTAs remain, side by side: "Explore courses" (solid CALP red, white text) and
  "Find a training" (outlined CALP red). Same sizing and mobile stacking as today.

**Desktop header**
- Add a discreet text link "CALP Network ↗" immediately before the language selector.
- Plain white navigation link styling (same size/weight and hover treatment as the
  other header links) — not a button.
- Opens https://www.calpnetwork.org in a new tab (`target="_blank" rel="noreferrer"`),
  with the arrow marked decorative and an accessible label noting it opens externally.
- Kept on one line (`whitespace-nowrap`, shrink-0) so the nav doesn't wrap on narrower
  desktop widths; existing header spacing/gaps unchanged.

**Mobile menu**
- Same "CALP Network ↗" entry added to the dropdown menu, near the bottom alongside
  "Find a training".

Unchanged: the footer "Visit the CALP Network website" link, the logo link to the
Training website homepage, the Training Hub button, and all colours/fonts.

## Technical notes

- `src/routes/index.tsx`: delete the external `<a>` from the hero button group.
- `src/components/site/SiteHeader.tsx`: add the external anchor inside the right-hand
  cluster, before the language `DropdownMenu`, plus a `DropdownMenuItem asChild` with
  the same anchor in the mobile menu.
- The URL is added to `src/config/site.ts` as `CALP_NETWORK_URL` so header and footer
  read it from one place; the footer link is repointed at that constant (same address).
