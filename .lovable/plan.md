# Redesign the site to match the CALP design

Rebuild the homepage to match the attached design exactly, then roll the same palette, typography, header, footer and spacing across every other page.

## What changes

### 1. Design system (palette + type)
- Replace the current crimson/slate palette with the design's colours, sampled directly from the attached PNG so they match to the letter:
  - CALP red (headlines, "Apply" buttons, links, logo) — approx `#C8102E`
  - Deep teal/navy (primary buttons, nav text) — approx `#14506B`
  - Teal and pale-blue decorative circles — approx `#3E9BAA` / `#A8D2DA`
  - Blush band behind "How to apply" — approx `#EFD5CE`
  - White page background (the current off-white canvas goes away)
- Typography: Roboto for everything (headings and body), self-hosted via the Roboto font package. Headings bold, tight leading, sentence case as in the design. The current Sora/Inter pairing is removed.
- Margins/rhythm matched to the design: wide centred container, generous section spacing, card padding and border radii as drawn.

### 2. Header
- Logo left (existing red CALP logo with tagline lockup), vertical divider.
- Centre nav: Courses, Trainings, Trainers, Calendar, How to apply — teal, medium weight.
- Right: globe + "EN ⌄" language selector (dropdown replacing today's pill toggle), then a teal "Find a training" button.
- White, no blur, thin bottom hairline.

### 3. Homepage sections (top to bottom)
1. **Hero** — left column: "Build the skills / to deliver better CVA." in red, sub-line, teal "Explore courses" button + outlined "Find a training" button. Right: full-bleed workshop photo with teal, pale-blue and red circles peeking out behind its corners.
2. **Three-column band**:
   - *Explore our courses* + "View all courses →": three photo cards with title, 2–3 line summary, modality + language codes, and a small square arrow button.
   - *Upcoming trainings* + "View full calendar →": rows with big red day / small month, course title, "City, Country • In-person • EN" meta, red "Apply" button, hairline dividers.
   - *Meet our trainers* + "View all trainers →": three portrait cards with name, language codes, region.
3. **How to apply** — blush full-width band with decorative circles, red heading, three numbered steps in red circles with chevrons between, and a teal "See application guidance" button.
4. **Footer** — logo left, centred "Visit the CALP Network website" link, right-side red Privacy Policy / Cookie Policy / Terms of Use links.

All content stays wired to the live database exactly as it is now; only presentation changes. Where the database has more/fewer items than the mockup, the layout keeps the same card and row design.

### 4. Other pages
Courses, course detail, trainings, training detail, trainers, calendar, apply and contact get the new palette, Roboto type, new header/footer, and the redesigned card/row components — same structure and functionality, new skin.

## Assets I need from you
- Hero workshop photo (the training-room image)
- The three course card photos (market/cash-distribution images)
- Trainer portrait photos (or confirm I should keep pulling photos from the database and use the existing portraits as fallback)

Everything else (logo, icons, circles) I can produce from what's already in the project.

## Technical notes
- Brand tokens redefined in `src/styles.css` (`@theme inline` + `:root`); no hardcoded colour utilities in components.
- Roboto loaded via a `@fontsource` package import in `src/styles.css`, mapped to `--font-sans` / `--font-display`.
- New/edited components: `SiteHeader`, `SiteFooter`, `BrandWordmark`, `CourseCard`, `TrainingRow`, `TrainerCard`, plus new `HowToApply`, `LangSelect` and `BrandBlobs` updates.
- `src/routes/index.tsx` rewritten to the four-section composition; other routes keep their loaders/queries untouched.
- Exact hex values sampled from the attached design image before implementation.
- Responsive: the three-column band stacks to one column on mobile using grid + `min-w-0` so text truncates rather than clips.
