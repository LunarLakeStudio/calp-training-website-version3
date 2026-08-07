# Trim the site to 10 real courses and simplify navigation

## 1. Remove About and News

- Delete the `/about` and `/news` pages.
- Remove both from the header navigation, leaving: Courses, Trainers, Trainings, Calendar, How to Apply — plus the Contact button.
- Remove both from the footer links.
- Remove the "Recent Insights" news block on the home page (the Mission block stays, now full width) and delete the news sample data.
- Header labels: the "Apply" item is relabelled "How to Apply" in all four languages.

## 2. Home page hero

- Remove the pulsing "Enrollment Open" badge above the headline. Everything else in the hero stays.

## 3. The 10 courses

Replace the current sample catalogue (8 handwritten + 12 generated placeholders) with exactly the 10 courses from your document, using each course's real title, description and language availability:

1. CVA – The Fundamentals (EN, ES, FR, AR) — 1 day, face to face
2. Core CVA Skills for Programme Staff — Face to Face (EN, ES, FR, AR) — 5 days
3. Core CVA Skills for Programme Staff — Online (EN, ES, FR, AR) — 12 weeks, facilitated online
4. Core CVA Skills for Supply Chain, Finance and ICT Staff (EN) — 5 days
5. Core CVA Skills for Managers (EN) — 2 days
6. Core CVA Skills for Donors (EN) — modular, or 1.5 days consecutively
7. Market Assessment Tools Training (EN, ES, FR, AR) — 5 days with field work / 3.5 without
8. Linking Humanitarian CVA with Social Protection (EN, ES, FR, AR) — 1 day in two parts
9. Monitoring 4 CVA (EN, ES, FR, AR) — 1 day
10. Response Analysis (EN, ES, FR) — 3 days

Each gets a short summary for the card, the full description for the detail page, topic tags, level, duration and a cover image drawn from the three existing course photos.

The Courses page filters (topic / language / level) keep working against this new set.

## Technical notes

- `src/data/courses.ts` is rewritten with the 10 entries; the placeholder generator loop is deleted. This file is also the fallback used whenever the Training Hub database is unreachable, so the site shows these 10 courses either way.
- `src/data/trainings.ts` sample trainings reference course ids `c1`–`c8`; ids are remapped so sample trainings still resolve to a real course.
- Routes deleted: `src/routes/about.tsx`, `src/routes/news.tsx`; data file `src/data/news.ts` deleted. `src/routeTree.gen.ts` regenerates automatically.
- Nav dictionary: `nav.about` / `nav.news` removed, `nav.apply` reworded to "How to Apply" (and FR/ES/AR equivalents).
- `label.enrollment` dictionary entry removed with the badge.
- Sitemap route drops `/about` and `/news`.

## Not included

- No changes to application forms — per-training forms come later.
- Course links from the document (course overview / training materials PDFs) are not wired up yet; the existing generic download placeholders remain until you provide the URLs.
