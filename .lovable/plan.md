# Make the site text stronger and easier to read

Client feedback: the text looks pale and should be bigger or bolder. Checked every route and site component — the cause is a combination of small sizes and light weight, not the colours themselves.

## What the audit found

- Most body copy is 14px (`text-sm`) at Roboto Regular 400 — small for paragraph text on desktop.
- Many labels, badges, meta lines and even some buttons are 12px (`text-xs`).
- Several sub-headings render at 14px, so headings and body copy look the same size.
- A few places soften the colour: `text-calp-blue/90` body copy on the course detail page, and form placeholders set to full-black `text-calp-ink` which reads as heavy-but-flat.

## Proposed changes (presentation only)

1. **Body copy up to 16px.** All paragraph and card description text moves from `text-sm` to `text-base`, with `leading-relaxed` kept for comfortable line spacing.
2. **Small text up to 14px.** Every `text-xs` label, badge, meta line and button label becomes `text-sm`, so nothing sits below 14px (guidelines allow 12px minimum, but 14px reads much better).
3. **Bolder where it carries meaning.** Course titles in the accordion, trainer names, training titles and section links move from Medium 500 to Bold 700. Field labels and meta lines move from 400 to Medium 500.
4. **Restore heading hierarchy.** Sub-headings currently at 14px (course detail "About"/"Topics"/"Trainers", trainer and training card titles) move up to 18–20px Bold.
5. **Remove softened text colours.** `text-calp-blue/90` becomes solid, and paragraph copy stays pure black on white for maximum contrast. Form placeholders get a proper muted tone so real input still looks strongest.
6. **Buttons** keep their colours but gain 14–16px Medium/Bold labels so calls to action read clearly.

Only Roboto 400/500/700 and existing CALP colours are used — no new fonts, colours or layout changes.

## Technical notes

Tailwind class edits only, across `src/routes/*.tsx` and `src/components/site/*.tsx` (CourseCard, CourseAccordionList, TrainingRow, TrainingCard, TrainerRow, TrainerCard, PageHero, AnimatedPageHero, FilterSelect, SiteFooter). No data, logic or component structure changes. Verification: grep for remaining `text-xs`, `text-[13px]`, `text-[10px]` and `/90` colour opacities, then screenshot home, courses, trainings, trainers, apply and contact at desktop and mobile widths to confirm nothing wraps or clips.
