# Add a Home nav link and give the hero more visual presence

Two focused changes, both presentation-only. No colours or fonts outside the CALP palette are introduced.

## 1. Home button in the navigation

The header currently starts at "Courses" — there is no way back to the landing page except the logo.

- Add a "Home" link as the first item in the header nav, pointing at `/` (the existing home route).
- It behaves exactly like the other links: Dark Blue by default, CALP Red when it is the active page.
- Because `/` is the parent of every route, the active state is matched exactly so "Home" is not highlighted while you are on `/courses`.
- The label is translated in all four site languages (English, French, Spanish, Arabic) so it does not break when the language is switched.

## 2. Bigger hero picture and bolder shapes

The hero photo currently sits in half of a two-column split at a 16:9 crop, and the decorative shapes are mostly hidden behind it.

- Give the image column more of the row so the photo reads noticeably larger, with the text column slightly narrower.
- Change the photo crop from wide 16:9 to a taller ratio so it gains real height instead of just width. Rounded corners are kept.
- Increase the vertical breathing room of the hero band so the larger image is not cramped.
- Enlarge both decorative shape clusters and raise their opacity so they clearly frame the photo — the cool cluster spilling out past the top-left of the image and the warm cluster past the bottom-right, both bleeding off the section edge as in the brand artwork.
- Add a third, quieter shape accent behind the headline side so the whole hero band feels visual rather than only the right half.
- Shapes stay strictly decorative: behind the photo, non-interactive, hidden from screen readers, and never under body copy at an opacity that would hurt legibility.

## Technical notes

- `src/i18n/dict.ts` — add a `nav.home` entry with the four locale strings.
- `src/components/site/SiteHeader.tsx` — add `<HeaderLink to="/">` as the first nav item; pass `activeOptions={{ exact: true }}` for the home link only so it does not stay active on child routes.
- `src/routes/index.tsx` — hero section: widen the image column via the grid template, swap the image aspect ratio, increase section padding, and grow the `ShapeClusterCool` / `ShapeClusterWarm` sizing and offsets. Add one extra cluster on the text side.
- `src/components/site/BrandShapes.tsx` — raise the `fill-opacity` values on the cluster shapes so they are more visible, still using only `var(--calp-*)` palette variables. No new fills.
- Nothing touches data fetching, routes, or business logic.

## Note on the current error

The site is still showing `SHARED_SUPABASE_SERVICE_ROLE_KEY is not configured on the server`, which is unrelated to these visual changes — the remix did not inherit the shared database key, so trainings and trainers come back empty. Courses fall back to the built-in catalogue, which is why parts of the page still render. This plan does not address it; tell me when you want to supply that key and I will handle it separately.
