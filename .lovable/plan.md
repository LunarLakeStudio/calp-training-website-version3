# Find a Trainer: drop-down filters + batched loading

## What changes for visitors

- The Find a Trainer filters become the same compact drop-downs used on Courses, Calendar and Find a Training: All Countries, All Regions, All Languages, All Certified Courses, plus the existing name/location search and a Reset filters button.
- The page loads only the first three rows of trainer cards (12 cards) instead of all 180+. A "Load More Trainers" button beneath the results fetches the next three rows each click, with a loading indicator while fetching. The button disappears when there are no more matches.
- Changing any filter or the search resets results back to the first batch, and the new filters are applied in the database query, not in the browser.
- The counter reads "Showing X of Y" using the total match count from the database.

## Data layer

Trainer records already carry country, region, language flags and certified-course links in the shared database, so all four filters can be applied server-side.

- Extend the public `Trainer` shape with `region` and `courseIds` (certified courses), keeping name, location, languages and photo unchanged.
- Add a paginated fetcher in `src/lib/content.server.ts`:
  `fetchTrainersPage({ country, region, language, courseId, query, offset, limit })`
  - selects the same public column subset plus `region` and `trainer_courses(course_id)`
  - `share_on_website = true`, ordered by first name then id for a stable page order
  - country/region via `.eq`, language via the matching `lang_*` boolean (or `other_language`), search via `.or` on first/last name and country
  - certified course filter narrows to trainer ids from `trainer_courses` for the selected course
  - `.range(offset, offset + limit - 1)` with `count: "exact"` so the response is `{ trainers, total }`
- Add `fetchTrainerFacets()` returning the distinct countries, regions, languages and certified courses for the drop-downs, so options don't depend on the currently loaded page.
- Both keep the existing "database secret missing" fallback: they filter, page and derive facets from the local sample trainers instead of throwing, so the page still works without the key.
- Expose both through `src/lib/content.functions.ts` as server functions with Zod-validated input.

## Front end

- `src/routes/trainers.tsx`: replace `FilterChip`/`FilterGroup` with the shared `FilterSelect` component in a responsive grid (1 column mobile, 2 tablet, 4 desktop), matching the other pages' labels (12px bold) and placeholders.
- Filter state moves into URL search params (`country`, `region`, `language`, `course`, `q`) via `validateSearch`, so a filtered view is shareable and batch state resets naturally when filters change.
- Data loading uses TanStack Query's `useInfiniteQuery` with page size 12, keyed on the active filters; "Load More Trainers" calls `fetchNextPage`, shows a spinner/label while `isFetchingNextPage`, and hides when `hasNextPage` is false.
- Reset filters clears all drop-downs and the search box.
- Card grid, `TrainerCard`, hero copy, animations and CALP brand styling stay exactly as they are.

## Technical notes

- Select strings are typed as plain `string` with `.returns<T>()` row typing to keep typechecks fast.
- The trainers loader stays public (no auth middleware), so SSR/prerender is unaffected.
- Language filter maps display codes (EN/FR/ES/AR) back to the boolean columns; other languages fall back to an `other_language` match.
