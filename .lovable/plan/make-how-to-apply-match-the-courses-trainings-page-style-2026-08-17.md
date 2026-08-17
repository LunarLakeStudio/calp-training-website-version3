# Make "How to apply" match the Courses / Trainings page style

The page currently opens with a full-width pale red band and a bleeding shape cluster, which no other inner page does. Courses and Trainings both open on plain canvas with the shared animated hero, then a content section on the subtle background pattern with white rounded cards. Bring "How to apply" in line.

**Pale red backgrounds behind the shapes go away entirely.** Both `bg-calp-pale-red-soft` bands (hero, line 56, and the closing CTA, line 102) and the two `ShapeClusterCool` / `ShapeClusterWarm` bleeds sitting on them are removed, so the page sits on the same plain canvas / subtle pattern as Courses and Trainings. The pale-soft-red eyebrow chip stays, since that is the shared hero treatment on every other page.

## Changes (only `src/routes/how-to-apply.tsx`)

1. **Hero** — replace the custom tinted `<section>` + `<header>` + `ShapeClusterCool` with the shared `AnimatedPageHero`, same as Courses and Trainings:
   - `eyebrow="Applications"` (renders as the pale-soft-red chip used site-wide)
   - `title="How to apply for a CALP Network CVA training"`
   - `intro="Everything you need to know before submitting an application."`
   Copy stays identical; only the styling/structure changes.

2. **Step cards** — keep the four numbered, colour-coded steps and their text, but restyle them to the shared card language used by course/training cards: white surface, `rounded-2xl`, hairline `border-calp-blue/5`, `shadow-sm` with a subtle hover lift. Wrap the list in a section with `max-w-7xl px-6 pb-24` and the `bg-subtle-pattern` backdrop layer, matching Courses. Remove the small decorative vertical connectors (they read as odd artefacts and don't exist elsewhere).

3. **Reveal animation** — wrap the step grid in `ScrollReveal` / `ScrollRevealGrid` so the page animates in like the other pages instead of appearing static.

4. **Closing CTA** — keep the "Ready to apply?" band and its two buttons, but present it as a white rounded card inside the same content section (consistent with the rest of the site) rather than a full-bleed pale band; drop the `ShapeClusterWarm` bleed. Heading, copy and both links (`/trainings` red primary, `/courses` dark blue outline) unchanged.

Head metadata, route path, all wording and links stay exactly as they are. No other files change.

## Verification
Screenshot `/how-to-apply` alongside `/courses` in the preview to confirm the hero, spacing, card treatment and background read the same.
