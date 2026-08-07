# Full-site translation: FR / ES / AR

Clicking FR, ES or AR in the header translates the whole site — navigation, page copy, and the course/trainer/training content coming from the database — while the URL stays the same and the choice is remembered per visitor.

## How it works

1. **Interface text** — every hard-coded English string on the pages (headings, intros, buttons, filter labels, form labels, footer, empty states) moves into the existing translation dictionary with FR/ES/AR versions written up front. No page keeps loose English text.
2. **Database content** — course titles, summaries, descriptions, topics, venue/format words and trainer locations are translated on demand by Lovable AI when a non-English language is active. Translations are cached so each item is translated once, not on every page view.
3. **Arabic** — the layout already flips to right-to-left; the pages get an RTL pass so spacing, arrows and card alignment look correct.
4. **Dates** — the calendar and training dates format in the selected language (e.g. "12 mars 2026", "١٢ مارس ٢٠٢٦").

## What the visitor sees

- Pick a language once; it sticks across pages and on return visits.
- English pages render instantly. On first switch to FR/ES/AR, database content shows briefly in English and then swaps in translated text; after that it is instant for everyone thanks to the cache.
- Anything not yet translated falls back to English rather than showing a blank.

## Technical notes

- Expand `src/i18n/dict.ts` with the full key set; sweep each route (`index`, `courses`, `courses.$courseId`, `trainers`, `trainings`, `trainings.$trainingId`, `calendar`, `apply`, `contact`) and the site components to replace literals with `t("key")`.
- Add a server function `src/lib/translate.functions.ts` (+ `translate.server.ts`) that takes a batch of strings plus a target language and calls the Lovable AI Gateway (`google/gemini-3.6-flash`) with a strict JSON schema, instructing it to keep humanitarian/CVA terminology and proper nouns intact.
- Cache translations in a new Cloud table `content_translations` (`source_hash`, `lang`, `text`) so each string is translated once; the server function reads cache first, translates only misses, and writes them back. Standard grants + RLS: public `SELECT` for `anon`/`authenticated`, writes only from the server function.
- Client side: `useTranslatedContent(items, lang)` wraps the existing `useCourses` / `useTrainers` / `useTrainings` hooks, keyed by language, returning English immediately and translated fields when ready.
- Locale-aware date helpers in `src/lib/format.ts` using `Intl.DateTimeFormat` with the active language.
- RTL polish in `src/styles.css` and components via logical properties / `rtl:` variants.
- Metadata (`head()` titles/descriptions) stays English for SEO since there is one URL per page.

## Out of scope

- Separate `/fr`, `/es`, `/ar` URLs and per-language SEO metadata.
- Human review of AI translations (an editable override table can be added later).
